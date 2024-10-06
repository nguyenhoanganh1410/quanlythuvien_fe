import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getListArticles } from '@/features/articles/articlesActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IArticle } from '@/features/articles/interfaces';
import { PATHS } from '@/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { articleHelpful, getArticleHelpfulCount } from '@/features/supportCenter/supportCenterActions';
import { IArticleHelpfulRequest } from '@/features/supportCenter/interfaces';

type Props = {};

export const usePromotedArticlesHooks = ({}: Props) => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const typeParam = queryParameters.get('type');
  const articleParam = queryParameters.get('article');

  const [isShowRequestModal, setShowRequestModal] = useState<boolean>(false);
  const { isAuthentication } = useAppSelector((state: RootState) => state.userStore);

  const handleCloseRequestModal = useCallback(() => {
    setShowRequestModal(false);
  }, []);

  const handleOpenRequestModal = useCallback(() => {
    setShowRequestModal(true);
  }, []);

  const [selectedArticle, setSelectedArticle] = useState<IArticle | null>();
  const { listArticles } = useAppSelector((state: RootState) => state.articlesStore);
  const { uerArticleHelpful } = useAppSelector((state: RootState) => state.supportCenterStore);

  const [currentArticles, setCurrentArticles] = useState<IArticle[]>([]);
  const [listSearchArticles, setListSearchArticles] = useState<IArticle[]>([]);

  const dispatch = useAppDispatch();

  const navLogin = useCallback(() => {
    navigate(PATHS.SIGN_IN);
  }, []);

  const onClickRequestModel = useCallback(() => {
    if (!isAuthentication) {
      navLogin();
      return;
    }
    handleOpenRequestModal();
  }, [isAuthentication]);

  const isSelectedArticle = useCallback(
    (articleId: number) => {
      return selectedArticle?.id == articleId;
    },
    [selectedArticle]
  );

  const onChangeSelectedArticle = useCallback((article: IArticle) => {
    setSelectedArticle(article);
  }, []);

  const getFullName = useMemo(() => {
    return selectedArticle?.userInfo?.firstName + ' ' + selectedArticle?.userInfo?.lastName;
  }, [selectedArticle]);

  const getTitleArticle = useMemo(() => {
    if (!selectedArticle?.title) return '';
    if (selectedArticle?.title.length > 22) return selectedArticle.title.substring(0, 22) + '...';

    return selectedArticle.title;
  }, [selectedArticle]);

  const goToSupportCenter = useCallback(() => {
    navigate(PATHS.SUPPORT_CENTER);
  }, []);

  const navPromotedArticles = async (type: string, article?: number) => {
    const filterData = listArticles.filter((item) => item.id == article);
    onChangeSelectedArticle(filterData[0]);
    navigate(PATHS.PROMOTED_ARTICLES + `?type=${type}&&article=${article}`);
  };

  const onSearchArticle = useCallback(
    (term: string) => {
      const filterData = listArticles.filter(
        (item) =>
          item.title.toLowerCase().includes(term.toLowerCase()) || item.type.toLowerCase().includes(term.toLowerCase())
      );
      setListSearchArticles(filterData);
    },
    [listSearchArticles]
  );

  const onSendHelpful = useCallback(async (articleId: number, isHelpful: boolean) => {
    const request: IArticleHelpfulRequest = {
      articleId: articleId,
      isHelpful: isHelpful,
    };
    await dispatch(articleHelpful(request));
    await dispatch(getArticleHelpfulCount(selectedArticle?.id ?? parseInt(articleParam ?? '0')));
  }, []);

  const onChangeSearchArticle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value) {
        onSearchArticle(value);
      } else {
        setListSearchArticles([]);
      }
    },
    [onSearchArticle]
  );

  useEffect(() => {
    const loadArticles = async () => {
      await dispatch(getListArticles({ pageSize: 1000, page: 1 }));
    };
    loadArticles();
  }, []);

  useEffect(() => {
    const loadArticlesHelpful = async () => {
      await dispatch(getArticleHelpfulCount(selectedArticle?.id ?? parseInt(articleParam ?? '0')));
    };
    loadArticlesHelpful();
  }, [selectedArticle, articleParam]);

  useEffect(() => {
    if (!typeParam) return;
    const filterData = listArticles.filter((item) => item.type == typeParam);
    if (filterData.length > 0 && !selectedArticle) {
      const indexId = listArticles.findIndex((item) => item.id == parseInt(articleParam ?? '0'));
      onChangeSelectedArticle(filterData[indexId]);
    }
    setCurrentArticles(filterData);
  }, [listArticles, typeParam, articleParam]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return {
    currentArticles,
    getFullName,
    listArticles,
    selectedArticle,
    getTitleArticle,
    listSearchArticles,
    isShowRequestModal,
    uerArticleHelpful,
    onChangeSearchArticle,
    isSelectedArticle,
    goToSupportCenter,
    onClickRequestModel,
    handleCloseRequestModal,
    onChangeSelectedArticle,
    handleOpenRequestModal,
    navPromotedArticles,
    onSendHelpful,
  };
};
