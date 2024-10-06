import { icons } from '@/constants';
import { IPresetQuestion } from '@/features/question/interfaces';
import { FC } from 'react';

interface Props {
  listQuestions: IPresetQuestion[] | null;
  onAddPresetQuestion: () => void;
  onSelectEditQuestion: (value: IPresetQuestion) => () => void;
}

const PresetQuestions: FC<Props> = ({ listQuestions, onAddPresetQuestion, onSelectEditQuestion }) => {
  return (
    <div className="six-step mt-[36px] rounded-[14px]">
      <div
        className={`flex h-[65px] items-center justify-between border border-solid border-borderWhiteLight bg-bgHeaderCard px-4 py-[18px] text-center lg:px-6 ${
          listQuestions && listQuestions.length > 0 ? 'rounded-[14px_14px_0px_0px]' : 'rounded-[14px]'
        }`}
      >
        <div className="flex items-center justify-start text-center">
          <img src={icons.presentQuestion} alt="present-mail" className="h-5 w-5 lg:h-6 lg:w-6" />
          <p className="ml-2 text-sm font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary lg:text-lg">
            Preset Questions
          </p>
          <span className="ml-2 h-[22px] w-[44px] rounded-[999px] border border-solid border-gray-300 text-[10px] font-semibold not-italic leading-[22px] tracking-[0.05px] text-gray-800">
            Q's {listQuestions ? listQuestions.length : 0}
          </span>
        </div>
        <img
          onClick={onAddPresetQuestion}
          className="h-5 w-5 cursor-pointer lg:h-6 lg:w-6"
          src={icons.plusCircle}
          alt="plus circle"
        />
      </div>
      {listQuestions && listQuestions.length > 0 && (
        <div className="h-[auto] max-h-[500px] overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight">
          {listQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`flex h-auto items-center justify-between px-[24px] py-[18px] ${
                index % 2 === 0 ? 'bg-bgBodyCard' : 'bg-bgBodyCardSecond'
              }`}
            >
              <div className="w-full max-w-[320px] truncate">
                <h3 className="text-xs font-semibold not-italic leading-[normal] tracking-[0.14px] text-secondary lg:text-sm">
                  {question.description}
                </h3>
                <p className="mt-1 text-3xs font-medium not-italic leading-[normal] tracking-[0.1px] text-gray-400 lg:text-2xs">
                  Question {index + 1}
                </p>
              </div>
              <button
                onClick={onSelectEditQuestion(question)}
                className="flex h-[28px] w-[52px] items-center justify-start rounded-[999px] border border-solid border-gray-300 bg-gray-300 p-[6px] text-3xs font-semibold not-italic leading-4 tracking-[0.05px] text-gray-800 hover:border-black lg:text-2xs"
              >
                <img src={icons.pencil} alt="pencil" className="aspect-square w-2.5 lg:w-3" />{' '}
                <span className="ml-1">Edit</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PresetQuestions;
