import { Input } from '@/components';
import { FC } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import CheckoutButton from '../CheckoutButton';
import BillingDetails from '../BillingDetails';
import { useCompanyAddressHooks } from './hooks';
import Select from '@/components/Select';

interface IProps {}

const CompanyAddress: FC<IProps> = () => {
  const { formik, countries, isLoading } = useCompanyAddressHooks();

  return (
    <div className="mx-auto flex w-full max-w-[80%] flex-col gap-0 py-6 md:flex-row md:gap-x-12 md:py-10 2xl:gap-x-20 2xl:py-16">
      <div className="flex w-full flex-col gap-4 md:w-2/4 xl:gap-6 2xl:gap-8">
        <div>
          <div className="mb-2 font-Inter text-base font-semibold text-slate-600">Company Address</div>
          <div className="font-Inter text-xs font-normal text-slate-600">
            Used to calculate tax and will appear on billing documents.
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={formik.submitForm}>
          <Input
            name="companyName"
            label="Company name"
            isRequired
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.companyName}
            errorMessage={formik.errors.companyName}
          />
          <Select
            isRequired
            label="Country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={countries}
            name="country"
            value={formik.values.country}
            touched={formik.touched.country}
            errorMessage={formik.errors.country}
          />
          <Input
            name="addressLine1"
            label="Address line 1"
            isRequired
            value={formik.values.addressLine1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.addressLine1}
            errorMessage={formik.errors.addressLine1}
          />
          <Input
            name="addressLine2"
            label="Address line 2"
            value={formik.values.addressLine2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.addressLine2}
            errorMessage={formik.errors.addressLine2}
          />
          <Input
            name="postalCode"
            label="Postal code"
            isRequired
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.postalCode}
            errorMessage={formik.errors.postalCode}
          />
          <Input
            name="city"
            label="City / Town / Village"
            isRequired
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.city}
            errorMessage={formik.errors.city}
          />
          <Input
            name="state"
            label="State / Province / Region"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.state}
            errorMessage={formik.errors.state}
          />
          <CheckoutButton isLoading={isLoading} onClick={formik.submitForm} />
        </form>
      </div>
      <div className="mt-8 w-full md:mt-0 md:w-2/4">
        <BillingDetails />
      </div>
    </div>
  );
};

export default CompanyAddress;
