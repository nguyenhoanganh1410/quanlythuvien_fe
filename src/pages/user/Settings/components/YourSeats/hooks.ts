import { PATHS } from '@/constants';
import { ISeat } from '@/features/seat/interfaces';
import { deleteSeat, getListSeats } from '@/features/seat/seatActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useYourSeatsHooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModelConfirm, setShowModelConfirm] = useState(false);
  const [showModelDefine, setShowModelDefine] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<ISeat | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { seats, isLoading, pageSize, totalCount } = useAppSelector((state: RootState) => state.seatStore);

  const onShowModelDefine = useCallback(() => {
    setShowModelDefine(true);
  }, []);

  const onCloseModelDefine = useCallback(() => {
    setShowModelDefine(false);
  }, []);

  const onShowModelConfirm = useCallback(() => {
    setShowModelConfirm(true);
  }, []);

  const onCloseModelConfirm = useCallback(() => {
    setShowModelConfirm(false);
  }, []);

  const onClickDelete = useCallback((seat: ISeat) => {
    setSelectedSeat(seat);
    onShowModelConfirm();
  }, []);

  const onClickConfirmDelete = useCallback(async () => {
    await dispatch(deleteSeat(selectedSeat?.id || ''));
    onCloseModelConfirm();
    setSelectedSeat(null);
  }, [selectedSeat]);

  const onClickGenerate = useCallback((seat: ISeat) => {
    //TODO: call api in here
    console.log(seat);
  }, []);

  const onClickDefineNow = useCallback(() => {
    onShowModelDefine();
  }, []);

  const onClickAddMoreSeats = useCallback(() => {
    navigate(PATHS.CHECKOUT);
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(totalCount / pageSize);
  }, [pageSize, totalCount]);

  const onPageClick = useCallback(async (value: { selected: number }) => {
    await dispatch(getListSeats({ page: value.selected + 1 }));
    setCurrentPage(value.selected + 1);
  }, []);

  const loadSeats = useCallback(async () => {
    await dispatch(getListSeats({ page: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    loadSeats();
  }, []);

  return {
    seats,
    pageSize,
    pageCount,
    isLoading,
    totalCount,
    currentPage,
    showModelDefine,
    showModelConfirm,
    onClickDelete,
    onPageClick,
    onClickGenerate,
    onClickDefineNow,
    onShowModelDefine,
    onShowModelConfirm,
    onCloseModelDefine,
    onCloseModelConfirm,
    onClickAddMoreSeats,
    onClickConfirmDelete,
  };
};
