import { PATHS } from '@/constants';
import { getListArticles } from '@/features/articles/articlesActions';
import { IArticle } from '@/features/articles/interfaces';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SUPPORT_CENTER_DATA_01 = [
  {
    id: 'Getting Started',
    title: 'Getting Started',
    content: 'Everything you need to know to get started with Index.',
  },
  {
    id: 'Business Tools',
    title: 'Business Tools',
    content: "Information on Index's business tools and how to use each feature.",
  },
  {
    id: 'Account Management',
    title: 'Account Management',
    content: 'For all billing, payment, and changes to your account or subscription.',
  },
  {
    id: 'Team Sharing',
    title: 'Team Sharing',
    content: "Information on Index's Team Sharing plan.",
  },
  {
    id: 'Index Web',
    title: 'Index Web',
    content: 'Features for Web users.',
  },
  {
    id: 'Number Porting',
    title: 'Number Porting',
    content: 'How to transfer your number into or out of Index.',
  },
];

export const SUPPORT_CENTER_DATA_02 = [
  {
    id: 'Troubleshooting',
    title: 'Troubleshooting',
    content: 'Need help with Index?',
  },
  {
    id: 'Legal, Abuse, & Privacy',
    title: 'Legal, Abuse, & Privacy',
    content: '',
  },
];

export const useSupportCenterDashboardHooks = () => {
  const [selectedTypeArticle, setSelectedTypeArticle] = useState<string>(SUPPORT_CENTER_DATA_01[0].id);
  const { listArticles } = useAppSelector((state: RootState) => state.articlesStore);
  const [currentArticles, setCurrentArticles] = useState<IArticle[]>([]);
  const [listSearchArticles, setListSearchArticles] = useState<IArticle[]>([]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const navPromotedArticles = async (type: string, article?: number) => {
    navigate(PATHS.PROMOTED_ARTICLES + `?type=${type}&&article=${article}`);
  };

  const onChangeTypeArticle = useCallback((typeArticle: string) => {
    setSelectedTypeArticle(typeArticle);
  }, []);

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
  React.useEffect(() => {
    const loadArticles = async () => {
      await dispatch(getListArticles({ pageSize: 1000, page: 1 }));
    };
    loadArticles();
  }, []);

  React.useEffect(() => {
    const filterData = listArticles.filter((item) => item.type == selectedTypeArticle);
    setCurrentArticles(filterData);
  }, [listArticles, selectedTypeArticle]);

  return {
    listArticles,
    currentArticles,
    listSearchArticles,
    selectedTypeArticle,
    onChangeSearchArticle,
    onChangeTypeArticle,
    navPromotedArticles,
  };
};
