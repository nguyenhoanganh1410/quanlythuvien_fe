import { TOrderHistory, TPromotedArticles, TRecentActivity } from '@/features/payment/interfaces';
import { IDocument, IPoliciesData } from '@/features/policy/interfaces';
import { IPresetQuestionData } from '@/features/question/interfaces';

export const listPoliciesDataDefault: IPoliciesData = {
  page: 1,
  pageSize: 1,
  totalCount: 4,
  options: [
    {
      id: '30ea77f5-11f5-46db-a8d4-7b9338865fff',
      storageUrl: '',
      fileUrlS3: '',
      portalId: '',
      date: new Date(),
      firstName: 'DOROTHEA GLAUSE',
      lastName: '',
      provider: 'Principal Financial Group',
      policyNumber: 'S655',
      claimNumber: '',
      premium: 0,
      isOpenCase: false,
      status: 'CLARIFIED',
      progress: 100,
      address: {
        id: '9fede95d-535b-4155-8838-d0ccc9e82d4d',
        street1: '123 Main St',
        street2: '',
        street3: '',
        city: 'Cityville',
        state: 'CA',
        zip: '12345',
        country: 'USA',
        full: '123 Main St, Cityville, CA 12345, USA',
      },
      coverages: [
        {
          key: 'Dwelling Coverage',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
        {
          key: 'Personal Property Coverage',
          unlimited: false,
          amount: 0,
          timeCap: '',
        },
        {
          key: 'Other Structures',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
      ],
      deductibles: [
        {
          key: 'Wind and Hail',
          value: 'Not Found',
          amount: 0,
          percentage: 0,
        },
        {
          key: 'Other Perils',
          amount: 0,
          percentage: 0,
          value: 'Not Found',
        },
      ],
      endorsements: [
        {
          key: 'endorsement1',
          description: 'Description for endorsement 1',
        },
        {
          key: 'endorsement2',
          description: 'Description for endorsement 2',
        },
      ],
    },
    {
      id: 'f7a6f5a2-af19-4176-804e-c00f15c03429',
      storageUrl: '',
      fileUrlS3: '',
      portalId: '',
      date: new Date(),
      firstName: 'DOROTHEA GLAUSE',
      lastName: '',
      provider: 'Principal Financial Group',
      policyNumber: 'S655',
      claimNumber: '',
      premium: 0,
      isOpenCase: false,
      status: 'CLARIFIED',
      progress: 100,
      address: {
        id: '9fede95d-535b-4155-8838-d0ccc9e82d4d',
        street1: '123 Main St',
        street2: '',
        street3: '',
        city: 'Cityville',
        state: 'CA',
        zip: '12345',
        country: 'USA',
        full: '123 Main St, Cityville, CA 12345, USA',
      },
      coverages: [
        {
          key: 'Dwelling Coverage',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
        {
          key: 'Personal Property Coverage',
          unlimited: false,
          amount: 0,
          timeCap: '',
        },
        {
          key: 'Other Structures',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
      ],
      deductibles: [
        {
          key: 'Wind and Hail',
          value: 'Not Found',
          amount: 0,
          percentage: 0,
        },
        {
          key: 'Other Perils',
          amount: 0,
          percentage: 0,
          value: 'Not Found',
        },
      ],
      endorsements: [
        {
          key: 'endorsement1',
          description: 'Description for endorsement 1',
        },
        {
          key: 'endorsement2',
          description: 'Description for endorsement 2',
        },
      ],
    },
    {
      id: '70b68cee-fe33-4579-a1ee-f332a38584dd',
      storageUrl: '',
      fileUrlS3: '',
      portalId: '',
      date: new Date(),
      firstName: 'DOROTHEA GLAUSE',
      lastName: '',
      provider: 'Principal Financial Group',
      policyNumber: 'S655',
      claimNumber: '',
      premium: 0,
      isOpenCase: false,
      status: 'CLARIFIED',
      progress: 100,
      address: {
        id: '9fede95d-535b-4155-8838-d0ccc9e82d4d',
        street1: '123 Main St',
        street2: '',
        street3: '',
        city: 'Cityville',
        state: 'CA',
        zip: '12345',
        country: 'USA',
        full: '123 Main St, Cityville, CA 12345, USA',
      },
      coverages: [
        {
          key: 'Dwelling Coverage',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
        {
          key: 'Personal Property Coverage',
          unlimited: false,
          amount: 0,
          timeCap: '',
        },
        {
          key: 'Other Structures',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
      ],
      deductibles: [
        {
          key: 'Wind and Hail',
          value: 'Not Found',
          amount: 0,
          percentage: 0,
        },
        {
          key: 'Other Perils',
          amount: 0,
          percentage: 0,
          value: 'Not Found',
        },
      ],
      endorsements: [
        {
          key: 'endorsement1',
          description: 'Description for endorsement 1',
        },
        {
          key: 'endorsement2',
          description: 'Description for endorsement 2',
        },
      ],
    },
    {
      id: 'b46d7fde-104d-43c6-afdb-8a9385d45cca',
      storageUrl: '',
      fileUrlS3: '',
      portalId: '',
      date: new Date(),
      firstName: 'DOROTHEA GLAUSE',
      lastName: '',
      provider: 'Principal Financial Group',
      policyNumber: 'S655',
      claimNumber: '',
      premium: 0,
      isOpenCase: false,
      status: 'CLARIFIED',
      progress: 100,
      address: {
        id: '9fede95d-535b-4155-8838-d0ccc9e82d4d',
        street1: '123 Main St',
        street2: '',
        street3: '',
        city: 'Cityville',
        state: 'CA',
        zip: '12345',
        country: 'USA',
        full: '123 Main St, Cityville, CA 12345, USA',
      },
      coverages: [
        {
          key: 'Dwelling Coverage',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
        {
          key: 'Personal Property Coverage',
          unlimited: false,
          amount: 0,
          timeCap: '',
        },
        {
          key: 'Other Structures',
          amount: 0,
          timeCap: '',
          unlimited: false,
        },
      ],
      deductibles: [
        {
          key: 'Wind and Hail',
          value: 'Not Found',
          amount: 0,
          percentage: 0,
        },
        {
          key: 'Other Perils',
          amount: 0,
          percentage: 0,
          value: 'Not Found',
        },
      ],
      endorsements: [
        {
          key: 'endorsement1',
          description: 'Description for endorsement 1',
        },
        {
          key: 'endorsement2',
          description: 'Description for endorsement 2',
        },
      ],
    },
  ],
};

export const listQuestionsDataDefault: IPresetQuestionData = {
  page: 1,
  pageSize: 1,
  totalCount: 3,
  options: [
    {
      id: '1',
      description: 'What is my deductible?',
    },
    {
      id: '2',
      description: 'How many items in this section?',
    },
    {
      id: '3',
      description: 'Is my roof going to be covered?',
    },
  ],
};

export const LIST_DOCUMENTS: IDocument[] = [
  {
    id: 'document1',
    policyHolder: 'Tom Sowyer',
    carrier: 'American Family Insurance',
    uploadedDate: new Date(),
  },
  {
    id: 'document2',
    policyHolder: 'State Farm',
    carrier: 'American Family Insurance',
    uploadedDate: new Date(),
  },
];

export const LIST_ORDERS: TOrderHistory[] = [
  // {
  //   id: 1,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: null,
  //   status: EOrderHistoryStatus.notPaid,
  // },
  // {
  //   id: 2,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: null,
  //   status: EOrderHistoryStatus.notPaid,
  // },
  // {
  //   id: 3,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: 785,
  //   status: EOrderHistoryStatus.paid,
  // },
  // {
  //   id: 4,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: 885,
  //   status: EOrderHistoryStatus.paid,
  // },
  // {
  //   id: 5,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: 760,
  //   status: EOrderHistoryStatus.paid,
  // },
  // {
  //   id: 6,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: 598,
  //   status: EOrderHistoryStatus.paid,
  // },
  // {
  //   id: 7,
  //   createdAt: new Date(),
  //   paymentMethod: 'Visa ····7788',
  //   expireDate: 'Exp 4/2024',
  //   amountPaid: 964,
  //   status: EOrderHistoryStatus.paid,
  // },
];

export const LIST_PROMOTED_ARTICLES: TPromotedArticles[] = [
  {
    id: 1,
    title: 'What is Clarifi?',
  },
  {
    id: 2,
    title: 'Clarifi Pricing',
  },
  {
    id: 3,
    title: 'Contact Clarifi Support',
  },
  {
    id: 4,
    title: 'Clarifi Features List',
  },
  {
    id: 5,
    title: 'How do I create an account?',
  },
  {
    id: 6,
    title: 'Using the Appointments Feature',
  },
  {
    id: 7,
    title: 'How to set up Appointments & link your calendar',
  },
  {
    id: 8,
    title: 'How to Set Up & Disable Call Forwarding',
  },
];
function getDate() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = date < 10 ? `0${date}` : date;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${year}-${formattedMonth}-${formattedDate}T${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
export const LIST_RECENT_ACTIVITY: TRecentActivity[] = [
  {
    id: 1,
    title: 'Account Problems',
    description: 'Verify your account via verification code',
    createdAt: getDate(),
  },
  {
    id: 2,
    title: 'Business Tools',
    description: 'What is the Business Profile?',
    createdAt: getDate(),
  },
  {
    id: 3,
    title: 'Messaging Problems',
    description: 'How to mark all messages as read in Index',
    createdAt: getDate(),
  },
  {
    id: 4,
    title: 'Messaging Basics',
    description: 'How to send a PDF',
    createdAt: getDate(),
  },
];
