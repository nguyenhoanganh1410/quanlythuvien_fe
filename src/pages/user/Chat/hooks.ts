import { EPolicyStatus } from '@/constants/enum';
import { resetChatSessionData, setScrollToPage } from '@/features/chat/chatSlice';
import { IUpdatePolicyRequest } from '@/features/policy/interfaces';
import { updatePolicy } from '@/features/policy/policyActions';
import { resetCurrentPolicy } from '@/features/policy/policySlice';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

export const useChatPageHooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoadingCurrentPolicy, currentPolicy } = useAppSelector((state: RootState) => state.policyStore);
  const [indexTab, setIndexTab] = useState<number>(0);
  const [indexTabMobile, setIndexTabMobile] = useState<number>(0);
  const [isShowHomeValuationModal, setShowHomeValuationModal] = useState<boolean>(false);
  const [isShowShareEmailModal, setShowShareEmailModal] = useState<boolean>(false);

  const [pagePdf, setPagePdf] = useState<number>(1);
  const componentConversationPdfRef = useRef(null);

  const onSelectTab = useCallback(
    (index: number) => () => {
      setIndexTab(index);
    },
    []
  );

  const onSelectTabMobile = useCallback(
    (index: number) => () => {
      setIndexTabMobile(index);
    },
    []
  );

  const onBack = useCallback(async () => {
    navigate(-1);
    await dispatch(resetChatSessionData());
    await dispatch(resetCurrentPolicy());
  }, [dispatch, navigate]);

  const onChangePagePdf = useCallback(
    (page: number) => async () => {
      setPagePdf(page);
      await dispatch(setScrollToPage(true));
    },
    [dispatch]
  );

  const onContinueClarifi = useCallback(async () => {
    if (currentPolicy) {
      const request: IUpdatePolicyRequest = {
        id: currentPolicy.id,
        isOpenCase: true,
        status: EPolicyStatus.TRAINING,
      };
      await dispatch(updatePolicy(request));
    }
  }, [currentPolicy, dispatch]);

  const onCloseContinueClarifi = useCallback(() => {
    onBack();
  }, [onBack]);

  const onPrintInvoicePdf = useReactToPrint({
    content: () => componentConversationPdfRef.current,
    removeAfterPrint: true,
    copyStyles: true,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      const htmlInput = document && document.getElementById('listMessages');
      if (htmlInput) {
        htmlInput.className = 'max-w-xl flex flex-col-reverse w-full h-full';
        const { offsetWidth, offsetHeight } = htmlInput;
        const contentCanvas = await html2canvas(htmlInput, {
          width: offsetWidth,
          height: offsetHeight,
          scale: 2,
        });
        const imgData = contentCanvas.toDataURL('image/png');
        const docPdf = new jsPDF('p', 'px', [offsetWidth, offsetHeight]);
        docPdf.internal.pageSize.width = offsetWidth;
        docPdf.internal.pageSize.height = offsetHeight;
        docPdf.addImage(imgData, 'png', 0, 0, offsetWidth, offsetHeight);
        docPdf.save(`${currentPolicy?.id}.pdf`);
      }
    },
  });

  const onClickHomeValuationIcon = useCallback(() => {
    setShowHomeValuationModal(true);
  }, []);

  const onCloseHomeValuationModal = useCallback(() => {
    setShowHomeValuationModal(false);
  }, []);

  const onClickShareIcon = useCallback(() => {
    setShowShareEmailModal(true);
  }, []);

  const onCloseShareEmailModal = useCallback(() => {
    setShowShareEmailModal(false);
  }, []);

  useEffect(() => {
    onChangePagePdf(1);
  }, []);

  return {
    isShowShareEmailModal,
    isShowHomeValuationModal,
    indexTabMobile,
    componentConversationPdfRef,
    currentPolicy,
    isLoadingCurrentPolicy,
    pagePdf,
    indexTab,
    onSelectTabMobile,
    onContinueClarifi,
    onCloseContinueClarifi,
    onSelectTab,
    onBack,
    onChangePagePdf,
    onPrintInvoicePdf,
    onClickHomeValuationIcon,
    onCloseHomeValuationModal,
    onClickShareIcon,
    onCloseShareEmailModal,
  };
};
