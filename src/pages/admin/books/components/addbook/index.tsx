import { Input } from '@/components';
import { userModelAddBook } from './hooks';

interface IProps {
  onCancel: () => void;
}

const bookTypes = [
  {
    id: 'thieu_nhi',
    label: 'Sách thiếu nhi',
  },
  {
    id: 'ton_giao',
    label: 'Sách tôn giáo',
  },
  {
    id: 'vh_xh',
    label: 'Sách văn hoá xã hội',
  },
  {
    id: 'lich_su',
    label: 'Sách lịch sử',
  },
  {
    id: 'van_hoc',
    label: 'Sách văn học',
  },
  {
    id: 'CNTT',
    label: 'Sách khoa học công nghệ',
  },
];

const languageTypes = [
  {
    id: 'tieng_viet',
    label: 'Tiếng Việt',
  },
  {
    id: 'tieng_anh',
    label: 'Tiếng Anh',
  },
  {
    id: 'tieng_trung',
    label: 'Tiếng Trung',
  },
  {
    id: 'tieng_nhat',
    label: 'Tiếng Nhật',
  },
];

const ModelAddBook = ({ onCancel }: IProps) => {
  const { formik } = userModelAddBook({ onCancel });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="mb-6 text-lg font-semibold leading-7 text-gray-900">Tạo mới Sách</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative flex flex-row items-start justify-center">
              <Input
                name="ISBN"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ISBN}
                errorMessage={formik.errors.ISBN}
                placeholder="Nhập ISBN..."
                label="ISBN"
              />
            </div>
            <div className="relative flex flex-row items-start justify-center">
              <Input
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                errorMessage={formik.errors.title}
                placeholder="Nhập tên sách..."
                label="Tên sách"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative flex flex-row items-start justify-center">
              <Input
                name="authName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.authName}
                errorMessage={formik.errors.authName}
                placeholder="Nhập tác giả..."
                label="Tác giả"
              />
            </div>
            <div className="relative flex flex-row items-start justify-center">
              <Input
                name="quanlity"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quanlity}
                errorMessage={formik.errors.quanlity}
                placeholder="Nhập số lượng..."
                label="Số lượng"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative flex flex-row items-start justify-center">
              <Input
                name="language"
                typeElement="select"
                selectData={languageTypes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.language}
                errorMessage={formik.errors.language}
                placeholder="Nhập ngôn ngữ..."
                label="Ngôn ngữ"
              />
            </div>
            <div className="relative flex flex-row items-start justify-center">
              <Input
                name="type"
                typeElement="select"
                selectData={bookTypes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                errorMessage={formik.errors.type}
                label="Thể loại"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={onCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Hủy
        </button>
        <button className="rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800">
          Lưu
        </button>
      </div>
    </form>
  );
};

export default ModelAddBook;
