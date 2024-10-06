import { icons } from '@/constants';
import { FC } from 'react';
import { useDocumentsHooks } from './hooks';
import moment from 'moment';
import { Popover } from 'react-tiny-popover';

interface IProps {}

const DocumentsChat: FC<IProps> = () => {
  const {
    currentPolicy,
    listDocuments,
    documentIdShowPopover,
    onClosePopover,
    onShowPopover,
    onShareDocument,
    onDeleteDocument,
    onDownloadDocument,
  } = useDocumentsHooks();

  return (
    <div className="flex h-full w-full flex-col bg-gray-50">
      <div className="flex h-fit w-full flex-row items-center justify-center space-x-10 bg-white py-4">
        <div className="flex h-fit flex-row space-x-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <img alt="pdf-type" src={icons.pdfType} />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-bold text-primary">
              {currentPolicy?.firstName + ' ' + currentPolicy?.lastName}
            </p>
            <p className="text-xs font-medium text-gray-400">
              {moment(currentPolicy?.date).format('MMM DD, YYYY, HH:mm A')}
            </p>
          </div>
        </div>
        <p className="text-base font-medium text-gray-400">{currentPolicy?.address?.full}</p>
        <p className="text-base font-medium text-gray-500">{currentPolicy?.provider}</p>
        <div className="h-fit rounded-full bg-primary/10 px-2 py-2  text-xs font-bold text-primary">
          POLICY NUMBER: <p className="inline font-medium">{currentPolicy?.policyNumber}</p>
        </div>
        <div className="h-fit rounded-full bg-gray-800/10 px-2 py-2 text-xs font-bold text-gray-800">
          CLAIM NUMBER: <p className="inline font-medium">{currentPolicy?.claimNumber}</p>
        </div>
      </div>
      <div className="flex w-full flex-col py-10">
        <div className="flex flex-row items-center justify-between px-36 font-Lato">
          <p className="text-2xl font-medium text-primaryText">Documents</p>
          <button className="h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white">
            + Add New Policy
          </button>
        </div>
        <div className="mt-12 w-full  max-w-2xl self-center px-10 ">
          <table className="w-full table-auto rounded-lg bg-white font-Lato shadow">
            <thead className="h-12 border-b border-zinc-100">
              <tr className="text-sm font-medium text-gray-500 ">
                <th className="px-8 text-left">Policy Holder</th>
                <th className="px-8">Carrier</th>
                <th className="px-8">Uploaded</th>
              </tr>
            </thead>
            <tbody className="text-center text-sm font-normal">
              {listDocuments &&
                listDocuments.map((document) => (
                  <tr key={document.id} className="h-14 bg-white hover:bg-slate-50">
                    <td className="px-8 text-left text-linkText">
                      <div className="flex flex-row items-center space-x-2">
                        <div className=" rounded-md bg-primary/10 p-1.5">
                          <img alt="folder-document" src={icons.folderDocumentFill} />
                        </div>
                        <p>{document.policyHolder}</p>
                      </div>
                    </td>
                    <td>{document.carrier}</td>
                    <td className="relative">
                      {moment(document.uploadedDate).format('MMM DD, YYYY')}
                      <Popover
                        onClickOutside={onClosePopover}
                        isOpen={documentIdShowPopover === document.id}
                        positions={['left']}
                        content={
                          <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white px-8 py-4 font-Inter shadow">
                            <button onClick={onDownloadDocument} className="flex flex-row items-center space-x-2">
                              <img alt="cloud-download" src={icons.cloudDownloadFill} />
                              <p className="text-sm font-medium">Download</p>
                            </button>
                            <button onClick={onShareDocument} className="flex flex-row items-center space-x-2">
                              <img alt="share-fill" src={icons.shareFill} />
                              <p className="text-sm font-medium">Share</p>
                            </button>
                            <button onClick={onDeleteDocument} className="flex flex-row items-center space-x-2">
                              <img alt="trash-fill" src={icons.trashDocumentFill} />
                              <p className="text-sm font-medium text-primary">Delete</p>
                            </button>
                          </div>
                        }
                      >
                        <button
                          onClick={onShowPopover(document.id)}
                          className="absolute bottom-0 right-4 top-0 flex items-center justify-center"
                        >
                          <img alt="dot-vertical" src={icons.dotVertical} className="h-5 w-5 object-fill" />
                        </button>
                      </Popover>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentsChat;
