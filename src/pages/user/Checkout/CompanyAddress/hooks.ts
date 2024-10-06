import { REQUIRED_FIELD, REQUIRE_NUMBER_ERROR_MESSAGE } from '@/constants';
import { CHECKOUT_STEPS } from '@/constants/trialConstants';
import { updateCheckoutStep, updateCompanyAddress } from '@/features/checkout/checkoutData';
import { ICompanyAddress } from '@/features/checkout/interfaces';
import { RootState } from '@/store';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { countries as listCountriesDefault } from 'countries-list';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { IOption } from '@/interfaces';

export const useCompanyAddressHooks = () => {
  const [countries, setCountries] = useState<IOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { companyAddress } = useSelector((state: RootState) => state.checkoutStore);
  const dispatch = useDispatch();

  const handleSubmit = (values: ICompanyAddress) => {
    setIsLoading(true);
    dispatch(updateCompanyAddress(values));
    dispatch(updateCheckoutStep(CHECKOUT_STEPS.step02));
    setIsLoading(false);
  };

  const initialValues: ICompanyAddress = companyAddress;

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      companyName: Yup.string().trim().required(REQUIRED_FIELD),
      country: Yup.string().trim().required(REQUIRED_FIELD),
      addressLine1: Yup.string().trim().required(REQUIRED_FIELD),
      postalCode: Yup.number().typeError(REQUIRE_NUMBER_ERROR_MESSAGE).required(REQUIRED_FIELD),
      city: Yup.string().trim().required(REQUIRED_FIELD),
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
  });

  useEffect(() => {
    const listCountriesData = Object.values(listCountriesDefault);
    const updatedData: IOption[] = listCountriesData.map((country) => {
      return {
        label: country.name,
        value: country.continent,
      };
    });
    setCountries(updatedData);
  }, []);

  return {
    formik,
    isLoading,
    countries,
    handleSubmit,
  };
};
