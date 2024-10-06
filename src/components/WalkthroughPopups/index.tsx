import { images } from '@/constants';
import { StepType, TourProvider, useTour } from '@reactour/tour';
import { FC, useState } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUserInfo } from '@/features/user/userActions';
import { RootState } from '@/store';

interface IProps {
  children: React.ReactNode;
}

interface IContentItemProps {
  title?: string;
  content?: string;
  classModel?: string;
  isFirstStep?: boolean;
  isFinalStep?: boolean;
  isSpecializeQuestion?: boolean;
  nextStep: number;
  hideIcon?: boolean;
  headerContent?: string;
}

const ContentItem: FC<IContentItemProps> = ({
  title,
  classModel,
  content,
  nextStep,
  isFirstStep,
  isFinalStep,
  isSpecializeQuestion,
  hideIcon,
  headerContent,
}) => {
  const { setCurrentStep, setIsOpen } = useTour();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.userStore);
  const [isChecked, setIsChecked] = useState(false);
  const [specialization, setSpecialization] = useState<string>('');
  const [specializationType, setSpecializationType] = useState<string>('');

  const handleChangeSpecializationType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecializationType(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = async () => {
    if (isFinalStep && user) {
      let specializationValue = '';
      if (specializationType === 'other') {
        specializationValue = specialization;
      } else {
        specializationValue = specializationType;
      }
      await dispatch(
        updateUserInfo({
          isDoneWalkthrough: true,
          isFirstLogin: false,
          specialize: specializationValue,
        })
      );
      setIsOpen(false);
    }
    setCurrentStep(nextStep);
  };

  return (
    <div className={`${classModel ? classModel : 'w-80'} rounded-[14px]`}>
      {title && (
        <div
          className={clsx(
            'flex items-center rounded-tl-[14px] rounded-tr-[14px] px-8 py-5',
            isFinalStep ? 'justify-center bg-[#384D63]' : 'bg-bgHeaderCard'
          )}
        >
          {!hideIcon && (
            <div className="mr-2 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-orange-600">
              <img className="h-auto" src={images.iconLogo} alt="Clarifi logo" />
            </div>
          )}
          <p className={clsx('text-lg font-semibold', isFinalStep ? 'text-white' : 'text-secondary')}>{title}</p>
        </div>
      )}
      <div
        className={clsx(
          'flex flex-col items-center justify-center py-6',
          isFinalStep ? 'relative h-[159px] bg-secondary px-12' : 'bg-white px-8',
          title ? 'rounded-bl-[14px] rounded-br-[14px]' : 'rounded-[14px]'
        )}
      >
        {headerContent && <p className="mb-4 text-center text-lg font-semibold text-secondary">{headerContent}</p>}
        {isFinalStep ? (
          <>
            <p className="z-20 text-center text-sm font-medium text-white">{content}</p>
            <div className="absolute bottom-0 right-0">
              <img className="h-auto" src={images.congratsImage} alt="Clarifi logo" />
            </div>
            <div className="absolute bottom-0 left-0 overflow-hidden">
              <img className="h-auto rotate-90" src={images.congratsImage} alt="Clarifi logo" />
            </div>
          </>
        ) : isSpecializeQuestion ? (
          <form>
            <div className="w-full">
              <p className="mb-4 text-start text-lg font-semibold text-secondary">
                Do you specialize in any of the following:
              </p>
              <div className="mb-4 flex items-center rounded border border-gray-200 ps-4 ">
                <input
                  onChange={handleChangeSpecializationType}
                  type="radio"
                  id="contractor"
                  name="specialization"
                  value="contractor"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                />
                <label htmlFor="contractor" className="ms-2 w-full py-4 text-sm font-medium text-gray-900">
                  Contractor
                </label>
              </div>
              <div className="mb-4 flex items-center rounded border border-gray-200 ps-4 ">
                <input
                  onChange={handleChangeSpecializationType}
                  type="radio"
                  id="public_adjuster"
                  name="specialization"
                  value="public adjuster"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                />
                <label htmlFor="public_adjuster" className="ms-2 w-full py-4 text-sm font-medium text-gray-900 ">
                  Public Adjuster
                </label>
              </div>
              <div className="mb-4 flex items-center rounded border border-gray-200 ps-4 ">
                <input
                  onChange={handleChangeSpecializationType}
                  type="radio"
                  id="insurance_adjuster"
                  name="specialization"
                  value="insurance adjuster"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                />
                <label htmlFor="insurance_adjuster" className="ms-2 w-full py-4 text-sm font-medium text-gray-900 ">
                  Insurance Adjuster
                </label>
              </div>
              <div className="mb-4 flex items-center rounded border border-gray-200 ps-4 ">
                <input
                  onChange={handleChangeSpecializationType}
                  type="radio"
                  id="attorney"
                  name="specialization"
                  value="attorney"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                />
                <label htmlFor="attorney" className="ms-2 w-full py-4 text-sm font-medium text-gray-900 ">
                  Attorney
                </label>
              </div>
              <div className="mb-4 flex items-center rounded border border-gray-200 ps-4 ">
                <input
                  onChange={handleChangeSpecializationType}
                  type="radio"
                  id="other"
                  name="specialization"
                  value="other"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 "
                />
                <label htmlFor="other" className="ms-2 w-full py-4 text-sm font-medium text-gray-900 ">
                  Other
                </label>
              </div>
              {specializationType === 'other' && (
                <input
                  type="text"
                  id="other_specialization"
                  name="other_specialization"
                  className="h-[52px] w-full rounded border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 "
                  placeholder="Enter your specialization"
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              )}
            </div>
            <div className="flex w-full justify-center">
              <button
                disabled={!specializationType || (specializationType == 'other' && !specialization)}
                onClick={handleClick}
                className={`mt-6 h-10 w-36 rounded-lg bg-primary p-2 text-center text-sm font-bold text-white
                ${
                  !specializationType || (specializationType == 'other' && !specialization)
                    ? 'bg-primary/50'
                    : 'bg-primary'
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-sm font-medium text-secondary">{content}</p>
        )}
        {isFirstStep ? (
          <div className="flex flex-col items-center">
            <div className="mt-4 flex flex-row items-center space-x-2">
              <input
                onChange={handleCheckboxChange}
                checked={isChecked}
                type="checkbox"
                className="rounded border border-secondary font-medium"
              />
              <p className="text-start text-sm font-medium text-secondary">Yes I Agree and Understand</p>
            </div>
            <button
              onClick={handleClick}
              disabled={!isChecked}
              className={`mt-6 h-10 w-36 rounded-lg bg-primary p-2 text-center text-sm font-bold text-white
                          ${!isChecked ? 'bg-primary/50' : 'bg-primary'}`}
            >
              Continue
            </button>
          </div>
        ) : !isSpecializeQuestion ? (
          <button
            onClick={handleClick}
            className={`mt-6 h-10 w-36 rounded-lg bg-primary p-2 text-center text-sm font-bold text-white`}
          >
            {isFinalStep ? `Let's Do This 🔥` : 'Next'}
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export const tourSteps: StepType[] = [
  {
    selector: '.specialize-question',
    content: (
      <ContentItem
        classModel="max-w-[454px]"
        nextStep={1}
        isSpecializeQuestion
        title="Specialize Question"
        content=""
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'center',
  },
  {
    selector: '.zero-step',
    content: (
      <ContentItem
        classModel="max-w-[454px]"
        nextStep={2}
        isFirstStep
        title="Friendly Reminder!"
        content="Go Clarifi is an excellent way to clarify, identify, and extract critical information from the insurance policies you upload. While our Ai continues to be improved and optimized, it will always be your responsibility to verify the information we provide is accurate. Go Clarifi is not to be held liable in any way for any reason. Please see our Terms and Conditions for further clarifications. Happy Clarifi'ing!"
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'center',
  },
  {
    selector: '.first-step',
    content: (
      <ContentItem
        classModel="max-w-[454px]"
        nextStep={3}
        title="Let’s Begin!"
        content="Effortlessly uncover the critical details from insurance policies in moments not hours."
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'center',
  },
  {
    selector: '.second-step',
    content: <ContentItem nextStep={4} content="Start by adding an insurance policy that you would like to clarify." />,
    position: 'bottom',
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
  },
  {
    selector: '.three-step',
    content: (
      <ContentItem
        nextStep={5}
        content="The policies you upload will appear here. Once they are done training, you can begin clarifying!"
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'right',
  },
  {
    selector: '.four-step',
    content: (
      <ContentItem
        nextStep={6}
        content={`Easily filter between 'Clarifi in Progress' and 'Clarifi Completed' for better policy prioritization.`}
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'right',
  },
  {
    selector: '.five-step',
    content: (
      <ContentItem
        nextStep={7}
        content={`Create a custom email address tied to this portal. When clients send their insurance policies here, they'll be automatically uploaded and clarified within your portal, hassle-free.`}
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'left',
  },
  {
    selector: '.six-step',
    content: (
      <ContentItem
        headerContent="Final step!"
        hideIcon
        nextStep={8}
        content="Establish a set of standard questions that will be automatically applied to every insurance policy submitted to the portal for clarification."
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'left',
  },
  {
    selector: '.final-step',
    content: (
      <ContentItem
        title="Congrats!"
        classModel="max-w-[454px]"
        isFinalStep
        nextStep={9}
        content="You are all set! Please reach out if you have any questions. Happy Clarifying!"
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, color: 'transparent', zIndex: 1000 }),
    },
    position: 'center',
  },
];

export const tourStepsMobile: StepType[] = [
  {
    selector: '.specialize-question',
    content: (
      <ContentItem
        classModel="max-w-[454px]"
        nextStep={1}
        isSpecializeQuestion
        title="Specialize Question"
        content=""
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'center',
  },
  {
    selector: '.zero-step',
    content: (
      <ContentItem
        classModel="max-w-[454px]"
        nextStep={2}
        isFirstStep
        title="Friendly Reminder!"
        content="Go Clarifi is an excellent way to clarify, identify, and extract critical information from the insurance policies you upload. While our Ai continues to be improved and optimized, it will always be your responsibility to verify the information we provide is accurate. Go Clarifi is not to be held liable in any way for any reason. Please see our Terms and Conditions for further clarifications. Happy Clarifi'ing!"
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'center',
  },
  {
    selector: '.first-step',
    content: (
      <ContentItem
        classModel="max-w-[454px]"
        nextStep={3}
        title="Let’s Begin!"
        content="Effortlessly uncover the critical details from insurance policies in moments not hours."
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'center',
  },
  {
    selector: '.second-step-mobile',
    content: <ContentItem nextStep={4} content="Start by adding an insurance policy that you would like to clarify." />,
    position: 'bottom',
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
  },
  {
    selector: '.three-step',
    content: (
      <ContentItem
        nextStep={5}
        content="The policies you upload will appear here. Once they are done training, you can begin clarifying!"
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'right',
  },
  {
    selector: '.four-step',
    content: (
      <ContentItem
        nextStep={6}
        content={`Easily filter between 'Clarifi in Progress' and 'Clarifi Completed' for better policy prioritization.`}
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'right',
  },
  {
    selector: '.five-step',
    content: (
      <ContentItem
        nextStep={7}
        content={`Create a custom email address tied to this portal. When clients send their insurance policies here, they'll be automatically uploaded and clarified within your portal, hassle-free.`}
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'left',
  },
  {
    selector: '.six-step',
    content: (
      <ContentItem
        headerContent="Final step!"
        hideIcon
        nextStep={8}
        content="Establish a set of standard questions that will be automatically applied to every insurance policy submitted to the portal for clarification."
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, zIndex: 1000 }),
    },
    position: 'left',
  },
  {
    selector: '.final-step',
    content: (
      <ContentItem
        title="Congrats!"
        classModel="max-w-[454px]"
        isFinalStep
        nextStep={9}
        content="You are all set! Please reach out if you have any questions. Happy Clarifying!"
      />
    ),
    styles: {
      maskWrapper: (base) => ({ ...base, color: 'transparent', zIndex: 1000 }),
    },
    position: 'center',
  },
];

const WalkthroughPopups: FC<IProps> = ({ children }) => {
  return (
    <TourProvider
      steps={tourSteps}
      showCloseButton={false}
      showDots={false}
      showNavigation={false}
      showBadge={false}
      disableDotsNavigation
      disableFocusLock
      disableInteraction
      disableKeyboardNavigation
      onClickMask={() => null}
      padding={{
        mask: 0,
        popover: [15, 20],
      }}
      styles={{
        popover: (base) => ({ ...base, borderRadius: 14, padding: 0, width: 'auto', zIndex: 1001 }),
        maskArea: (base) => ({ ...base, rx: 10, padding: 0 }),
      }}
    >
      {children}
    </TourProvider>
  );
};

export default WalkthroughPopups;
