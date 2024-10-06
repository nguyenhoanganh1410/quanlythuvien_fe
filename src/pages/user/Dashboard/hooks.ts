import { PATHS, listPoliciesDataDefault, listQuestionsDataDefault } from '@/constants';
import { getListChatSessions } from '@/features/chat/chatActions';
import { resetChatSessionData } from '@/features/chat/chatSlice';
import {
  checkPdfFile,
  deletePolicy,
  getDetailPolicy,
  getListPolicies,
  getPolicyFileUrl,
} from '@/features/policy/policyActions';
import { resetCurrentPolicy, setPoliciesData, setShowPopupInCorrectPdf } from '@/features/policy/policySlice';
import { IPresetQuestion } from '@/features/question/interfaces';
import { IDeletePolicyRequest, IPoliciesData, IPolicy, ITraining } from '@/features/policy/interfaces';
import { getListQuestions } from '@/features/question/questionActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fireStoreDb } from '@/config/firebase.config';
import { collection, onSnapshot, query, DocumentChange, where, doc, updateDoc } from 'firebase/firestore';
import { EPolicyStatus, ETypeUploadPolicy } from '@/constants/enum';
import { camelizeKeys } from 'humps';
import { useTour } from '@reactour/tour';
import { IOption } from '@/interfaces';
import { getListUserOptions } from '@/features/user/userActions';
import { tourSteps, tourStepsMobile } from '@/components/WalkthroughPopups';

export const useDashboardHooks = () => {
  const navigate = useNavigate();
  const { steps, currentStep, setCurrentStep, setIsOpen, setSteps } = useTour();

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth && setSteps) {
        window.innerWidth >= 1280 ? setSteps(tourSteps) : setSteps(tourStepsMobile);
      }
    });
  }, [setSteps]);

  const {
    isLoading: isLoadingUser,
    user,
    isAuthentication,
    listUserOptions: listUserOptionsStore,
  } = useAppSelector((state: RootState) => state.userStore);

  const {
    isLoading: isLoadingPolicies,
    isUploadingFile,
    isUploadFileSuccess,
    policiesData: policiesDataStore,
    uploadFileStatus,
    filterPolicy,
    listPolicies: listPoliciesStore,
    isShowPopupInCorrectPdf,
  } = useAppSelector((state: RootState) => state.policyStore);

  const { listQuestions: listQuestionsStore, isLoading: isLoadingQuestions } = useAppSelector(
    (state: RootState) => state.questionStore
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [openCreateQuestionModal, setOpenCreateQuestionModal] = React.useState<boolean>(false);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState<IPresetQuestion | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpenConfirmPopup, setOpenConfirmPopup] = React.useState<boolean>(false);
  const [policyId, setPolicyId] = useState('');
  const [userIdSelected, setUserIdSelected] = useState<number | null>(null);
  const [titleConfirmPopup, setTitleConfirmPopup] = useState<string | null>(null);
  const [fileSizeAlertPopup, setFileSizeAlertPopup] = React.useState<boolean>(false);

  const inputFilePolicy = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const listQuestions = useMemo(() => {
    if (user && !user.isDoneWalkthrough && user.isFirstLogin) {
      return listQuestionsDataDefault.options;
    }
    return listQuestionsStore;
  }, [user, listQuestionsStore]);

  const policiesData = useMemo(() => {
    if (user && !user.isDoneWalkthrough && user.isFirstLogin) {
      return listPoliciesDataDefault;
    }
    return policiesDataStore;
  }, [user, policiesDataStore]);

  const listPolicies = useMemo(() => {
    if (user && !user.isDoneWalkthrough && user.isFirstLogin) {
      return listPoliciesDataDefault.options;
    }
    return listPoliciesStore;
  }, [user, listPoliciesStore]);

  const renderUserName = useMemo(() => {
    return user ? user.firstName + ' ' + user.lastName : '';
  }, [user]);

  const renderInboundPortalEmail = useMemo(() => {
    return user ? user.inboundEmail : '';
  }, [user]);

  const listUserOptions = useMemo(() => {
    const useOptions: IOption[] = listUserOptionsStore.map((item) => {
      return { label: item.username, value: item.id };
    });
    return useOptions;
  }, [listUserOptionsStore]);

  const handleCloseInCorrectPdfModal = React.useCallback(async () => {
    await dispatch(setShowPopupInCorrectPdf(false));
  }, []);

  const handleCloseQuestionModal = React.useCallback(() => {
    setOpen(false);
    setSelectedQuestion(null);
  }, []);

  const handleCloseFileSizeAlertModal = React.useCallback(() => {
    setFileSizeAlertPopup(false);
  }, []);

  const handleCloseCreateQuestionModal = React.useCallback(() => {
    setOpenCreateQuestionModal(false);
  }, []);

  const handleCloseFilterModal = React.useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleOpenFilterModal = React.useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onSelectEditQuestion = React.useCallback(
    (question: IPresetQuestion) => () => {
      if (!question) return;
      setSelectedQuestion(question);
    },
    [open]
  );

  const onAddPresetQuestion = useCallback(() => {
    setOpenCreateQuestionModal(true);
  }, []);

  const onChangeSearchValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchValue(search);
  }, []);

  const onSelectAddNewPolicy = React.useCallback(() => {
    inputFilePolicy.current?.click();
  }, [inputFilePolicy]);

  const onChangeValueNewPolicy = async (event: ChangeEvent<HTMLInputElement>) => {
    const policyFile = event.target.files && event.target.files[0];
    if (policyFile) {
      try {
        const formData = new FormData();
        formData.append('file', policyFile);
        await dispatch(checkPdfFile(formData));
      } catch (error) {
        console.log(error);
      } finally {
        event.target.value = '';
      }
    }
  };

  const onViewChat = React.useCallback(
    (policyId: string) => async () => {
      navigate({
        pathname: PATHS.CHAT,
        search: policyId,
      });
      await dispatch(getDetailPolicy(policyId));
      await dispatch(getPolicyFileUrl(policyId));
      await dispatch(getListChatSessions(policyId));
    },
    []
  );

  const onCopyInboundMail = useCallback(() => {
    if (user) {
      navigator.clipboard.writeText(user.inboundEmail);
      toast('Copied inbound mail', {
        type: 'info',
        position: 'bottom-center',
        theme: 'light',
        autoClose: 500,
        hideProgressBar: true,
        closeButton: false,
        bodyClassName: 'toast-body',
      });
    }
  }, [user]);

  const onCopyRefLink = useCallback(() => {
    if (user) {
      navigator.clipboard.writeText(user.refId);
      toast('Copied ref link', {
        type: 'info',
        position: 'bottom-center',
        theme: 'light',
        autoClose: 500,
        hideProgressBar: true,
        closeButton: false,
        bodyClassName: 'toast-body',
      });
    }
  }, [user]);

  const onFetchMorePolicies = useCallback(async () => {
    if (policiesData) {
      const nextPage = policiesData.page + 1;
      await dispatch(
        getListPolicies({
          search: searchValue,
          filter: filterPolicy,
          userId: userIdSelected,
          page: nextPage,
        })
      );
    }
  }, [policiesData, searchValue, filterPolicy]);

  useEffect(() => {
    if (user && policiesData) {
      const queryData = query(
        collection(fireStoreDb, 'training-file-pdf'),
        where('user_id', '==', user.id.toString() ?? ''),
        where('status', '==', EPolicyStatus.PENDING)
      );
      const unsubscribe = onSnapshot(queryData, (snapshot) => {
        snapshot.docChanges().forEach((change: DocumentChange) => {
          const data = camelizeKeys(change.doc.data()) as ITraining;
          const changeType = change.type;
          const index = policiesData && policiesData.options.findIndex((item) => item.id === data.policyId);
          if (index !== -1 && changeType === 'modified') {
            const newPolicies = policiesData.options.map((item) => {
              if (item.id === data.policyId) {
                return {
                  ...item,
                  progress: data.progress,
                  status: data.progress >= 100 ? EPolicyStatus.TRAINING : data.status,
                };
              }
              return item;
            });
            const newPoliciesData: IPoliciesData = {
              ...policiesData,
              options: newPolicies,
            };
            dispatch(setPoliciesData(newPoliciesData));
          }
          if (index !== -1 && changeType === 'removed') {
            dispatch(
              getListPolicies({
                search: searchValue,
                filter: filterPolicy,
                userId: userIdSelected,
              })
            );
          }
          if (index === -1 && data.type === ETypeUploadPolicy.UPLOAD_BY_MAIL) {
            const newPolicy: IPolicy = {
              id: data.policyId,
              progress: data.progress,
              status: data.status,
              isOpenCase: true,
              date: data.createdTime,
            };
            const newUpdatedPoliciesData: IPoliciesData = {
              totalCount: policiesData.totalCount + 1,
              page: policiesData.page,
              pageSize: policiesData.pageSize,
              options: [newPolicy, ...policiesData.options],
            };
            dispatch(setPoliciesData(newUpdatedPoliciesData));
          }
        });
      });
      return () => unsubscribe();
    }
  }, [policiesData]);

  React.useEffect(() => {
    if (!selectedQuestion) return;
    setOpen(true);
  }, [selectedQuestion?.id]);

  React.useEffect(() => {
    const queryDataRejected = query(
      collection(fireStoreDb, 'training-file-pdf'),
      where('user_id', '==', user?.id.toString() ?? ''),
      where('status', '==', EPolicyStatus.REJECTED),
      where('file_size_alert', '==', false)
    );
    const unsubscribe = onSnapshot(queryDataRejected, (snapshot) => {
      snapshot.docChanges().forEach((change: DocumentChange) => {
        const data = camelizeKeys(change.doc.data()) as ITraining;
        const changeType = change.type;
        if (changeType === 'added' && data.type === ETypeUploadPolicy.UPLOAD_BY_MAIL) {
          setFileSizeAlertPopup(true);
          const docRef = doc(fireStoreDb, 'training-file-pdf', change.doc.id);
          updateDoc(docRef, { file_size_alert: true });
        }
      });
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const loadPolicies = async () => {
      await dispatch(
        getListPolicies({
          search: searchValue,
          filter: filterPolicy,
          userId: userIdSelected,
        })
      );
    };
    loadPolicies();
  }, [searchValue, filterPolicy, isUploadFileSuccess]);

  React.useEffect(() => {
    const loadQuestions = async () => {
      await dispatch(getListQuestions());
    };
    loadQuestions();
  }, [searchValue, filterPolicy]);

  React.useEffect(() => {
    if (user?.isStaff === false) {
      const loadUserOptions = async () => {
        await dispatch(
          getListUserOptions({
            search: '',
          })
        );
      };
      loadUserOptions();
    }
  }, []);

  useEffect(() => {
    const resetData = async () => {
      await dispatch(resetChatSessionData());
      await dispatch(resetCurrentPolicy());
    };
    resetData();
  }, []);

  useEffect(() => {
    if (user && !user.isDoneWalkthrough && (user.isFirstLogin || !user.isFirstLogin)) {
      setIsOpen(true);
      if (!user.isDoneWalkthrough && !user.isFirstLogin) {
        setCurrentStep(8);
      }
    }
  }, [user, user?.isDoneWalkthrough, user?.isFirstLogin, isAuthentication]);

  const onCloseConfirmPopup = React.useCallback(async () => {
    setPolicyId('');
    setOpenConfirmPopup(false);
  }, []);

  const onDeletePolicy = useCallback(
    (policyId: string) => async () => {
      setPolicyId(policyId);
      setTitleConfirmPopup('Are you sure you want to remove this policy upload?');
      setOpenConfirmPopup(true);
    },
    []
  );

  const handleDeletePolicy = useCallback(
    (policyId: string) => async () => {
      if (policyId) {
        const request: IDeletePolicyRequest = {
          id: policyId,
        };
        await dispatch(deletePolicy(request));
        await dispatch(
          getListPolicies({
            search: searchValue,
            filter: filterPolicy,
            userId: userIdSelected,
          })
        );
        toast('Remove policy has been successful!', {
          type: 'success',
          position: 'top-right',
          theme: 'light',
          autoClose: 5000,
          hideProgressBar: true,
          closeButton: false,
          bodyClassName: 'toast-body',
        });
      }
      onCloseConfirmPopup();
      console.log(`Delete product with id: ${policyId}`);
    },
    []
  );

  const handleDropdownSearch = async (searchTerm: string) => {
    await dispatch(
      getListUserOptions({
        search: searchTerm,
      })
    );
  };

  const handleDropdownSelect = async (selectedOption: IOption) => {
    const useId = parseInt(selectedOption.value.toString(), 0);
    setUserIdSelected(useId);
    await dispatch(
      getListPolicies({
        userId: useId,
      })
    );
  };

  const handleDropdownRemove = async () => {
    setUserIdSelected(null);
    await dispatch(
      getListUserOptions({
        search: '',
      })
    );
    await dispatch(
      getListPolicies({
        search: searchValue,
        filter: filterPolicy,
      })
    );
  };

  return {
    isShowPopupInCorrectPdf,
    listPolicies,
    isLoadingQuestions,
    listQuestions,
    isLoadingPolicies,
    isLoadingUser,
    uploadFileStatus,
    searchValue,
    user,
    policiesData,
    isUploadingFile,
    inputFilePolicy,
    open,
    openFilter,
    selectedQuestion,
    renderUserName,
    renderInboundPortalEmail,
    openCreateQuestionModal,
    steps,
    currentStep,
    isOpenConfirmPopup,
    policyId,
    listUserOptions,
    titleConfirmPopup,
    fileSizeAlertPopup,
    setIsOpen,
    onSelectAddNewPolicy,
    handleCloseFilterModal,
    handleOpenFilterModal,
    onSelectEditQuestion,
    handleCloseQuestionModal,
    onChangeValueNewPolicy,
    onViewChat,
    onChangeSearchValue,
    onCopyInboundMail,
    handleCloseCreateQuestionModal,
    onAddPresetQuestion,
    onFetchMorePolicies,
    handleCloseInCorrectPdfModal,
    onCloseConfirmPopup,
    onDeletePolicy,
    handleDeletePolicy,
    handleDropdownSearch,
    handleDropdownSelect,
    handleDropdownRemove,
    onCopyRefLink,
    handleCloseFileSizeAlertModal,
  };
};
