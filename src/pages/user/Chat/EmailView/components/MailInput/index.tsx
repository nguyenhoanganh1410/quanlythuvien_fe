import 'quill/dist/quill.snow.css';
import './styles.scss';
import { FC, MutableRefObject, forwardRef, useEffect, useRef } from 'react';
import Quill, { Delta } from 'quill';
import useMailInputHooks from './hooks';
import XMarkIcon from '@/components/iconSvgs/XMarkIcon';
import clsx from 'clsx';
import { IPolicy } from '@/features/policy/interfaces';

type EditorProps = {
  defaultValue?: Delta;
  setContentValue: (value: string) => void;
};

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
];

const Editor = forwardRef<Quill | null, EditorProps>(({ defaultValue, setContentValue }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const defaultValueRef = useRef(defaultValue);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    });

    quill.on('editor-change', function () {
      const innerHtmlValue = quill.root.innerHTML;
      setContentValue(innerHtmlValue);
    });

    if (ref && typeof ref !== 'function') {
      (ref as MutableRefObject<Quill | null>).current = quill;
    }

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    return () => {
      if (ref && typeof ref !== 'function') {
        (ref as MutableRefObject<Quill | null>).current = null;
      }
      container.innerHTML = '';
    };
  }, [ref, setContentValue]);

  return <div ref={containerRef} className="editor-container"></div>;
});

Editor.displayName = 'Editor';

type MailInputProps = {
  currentPolicy: IPolicy;
};

const MailInput: FC<MailInputProps> = ({ currentPolicy }) => {
  const {
    isDisabledSubmitButton,
    subjectValueInput,
    listCcEmails,
    listBccEmails,
    isShowBccEmail,
    isShowCcEmail,
    listRecipients,
    recipientValueInput,
    ccValueInput,
    bccValueInput,
    quillRef,
    setContentValueInput,
    onChangeBccValue,
    onChangeCcValue,
    onKeyDownRecipientInput,
    onRemoveRecipient,
    onChangeRecipientValue,
    onToggleBccEmail,
    onToggleCcEmail,
    onRemoveBcc,
    onRemoveCc,
    onKeyDownBccInput,
    onKeyDownCcInput,
    onChangeSubjectValue,
    onSubmitForm,
  } = useMailInputHooks({ currentPolicy });

  return (
    <div className="flex w-full flex-col gap-y-0.5 rounded border border-borderGrey bg-white px-4 py-2">
      {/* Recipients section*/}
      <div className="flex h-8 w-full flex-row items-center justify-between space-x-2 border-b border-borderGrey2 ">
        <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">Recipients:</p>
        <div className="flex h-full  w-full flex-row items-center space-x-2 overflow-x-auto">
          {listRecipients.map((item) => (
            <div key={item} className="flex items-center justify-center rounded bg-gray-200 px-2 py-0.5">
              <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">{item}</p>
              <button type="button" onClick={onRemoveRecipient(item)}>
                <XMarkIcon stroke="black" className="h-5 w-5" />
              </button>
            </div>
          ))}
          <input
            onKeyDown={onKeyDownRecipientInput}
            value={recipientValueInput}
            name="recipient"
            type="email"
            placeholder="Add recipient"
            onChange={onChangeRecipientValue}
            className="h-full w-40 border-none bg-transparent p-0 font-Lato text-xs text-black/50 outline-none placeholder:text-grey400 focus:ring-0 lg:text-sm 2xl:text-base"
          />
        </div>
        <div className="flex items-center space-x-2 font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">
          {!isShowCcEmail && (
            <button type="button" onClick={onToggleCcEmail}>
              Cc
            </button>
          )}
          {!isShowBccEmail && (
            <button type="button" onClick={onToggleBccEmail}>
              Bcc
            </button>
          )}
        </div>
      </div>
      {/* Cc section */}
      {isShowCcEmail && (
        <div className="flex h-8 w-full flex-row items-center justify-between space-x-2 border-b border-borderGrey2 ">
          <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">Cc:</p>
          <div className="flex h-full  w-full flex-row items-center space-x-2 overflow-x-auto">
            {listCcEmails.map((item) => (
              <div key={item} className="flex items-center justify-center rounded bg-gray-200 px-2 py-0.5">
                <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">{item}</p>
                <button type="button" onClick={onRemoveCc(item)}>
                  <XMarkIcon stroke="black" className="h-5 w-5" />
                </button>
              </div>
            ))}
            <input
              onKeyDown={onKeyDownCcInput}
              value={ccValueInput}
              name="cc"
              type="email"
              placeholder="Add cc"
              onChange={onChangeCcValue}
              className="h-full w-40 border-none bg-transparent p-0 font-Lato text-xs text-black/50 outline-none placeholder:text-grey400 focus:ring-0 lg:text-sm 2xl:text-base"
            />
          </div>
          <button type="button" onClick={onToggleCcEmail}>
            <XMarkIcon stroke="black" className="h-5 w-5" />
          </button>
        </div>
      )}
      {/* Bcc Section */}
      {isShowBccEmail && (
        <div className="flex h-8 w-full flex-row items-center justify-between space-x-2 border-b border-borderGrey2 ">
          <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">Bcc:</p>
          <div className="flex h-full  w-full flex-row items-center space-x-2 overflow-x-auto">
            {listBccEmails.map((item) => (
              <div key={item} className="flex items-center justify-center rounded bg-gray-200 px-2 py-0.5">
                <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">{item}</p>
                <button type="button" onClick={onRemoveBcc(item)}>
                  <XMarkIcon stroke="black" className="h-5 w-5" />
                </button>
              </div>
            ))}
            <input
              onKeyDown={onKeyDownBccInput}
              value={bccValueInput}
              name="bcc"
              type="email"
              placeholder="Add bcc"
              onChange={onChangeBccValue}
              className="h-full w-40 border-none bg-transparent p-0 font-Lato text-xs text-black/50 outline-none placeholder:text-grey400 focus:ring-0 lg:text-sm 2xl:text-base"
            />
          </div>
          <button type="button" onClick={onToggleBccEmail}>
            <XMarkIcon stroke="black" className="h-5 w-5" />
          </button>
        </div>
      )}
      {/* Subject */}
      <div className="flex h-8 w-full flex-row items-center space-x-2 border-b border-borderGrey2 ">
        <p className="font-Lato text-xs text-black/50 lg:text-sm 2xl:text-base">Subject:</p>
        <input
          value={subjectValueInput}
          name="subject"
          placeholder="Add subject"
          onChange={onChangeSubjectValue}
          className="h-full w-40 border-none bg-transparent p-0 font-Lato text-xs text-black/50 outline-none placeholder:text-grey400 focus:ring-0 lg:text-sm 2xl:text-base"
        />
      </div>
      <div className="relative h-40 w-full ">
        <Editor ref={quillRef} setContentValue={setContentValueInput} />
      </div>
      <div className="relative mt-2 h-10 w-full">
        <button
          onClick={onSubmitForm}
          disabled={isDisabledSubmitButton}
          type="submit"
          className={clsx(
            'rounded  px-6 py-2 font-Lato text-xs text-white lg:text-sm 2xl:text-base',
            isDisabledSubmitButton ? 'bg-primary/50' : 'bg-primary'
          )}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MailInput;
