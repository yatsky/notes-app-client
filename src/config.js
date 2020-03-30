const dev = {
  STRIPE_KEY: "pk_test_5rFGh83VPkWQWaHgt9bqlmRT009ek1NX2K",
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1h9lmbsbh2a1u"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://7l9t9fztm8.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_I7T4DR7N6",
    APP_CLIENT_ID: "i2tfamv7ulkj07vmq6h7r9tnf",
    IDENTITY_POOL_ID: "ap-southeast-2:20fad88f-af59-4592-b2d6-27a0e5b97558"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_5rFGh83VPkWQWaHgt9bqlmRT009ek1NX2K",
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1nm2e88vnt2ej"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://gellhz56i3.execute-api.ap-southeast-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_UpX4SwuB8",
    APP_CLIENT_ID: "7beq6tqca83eskcqtkn5hn11er",
    IDENTITY_POOL_ID: "ap-southeast-2:3a5f53d6-6431-4be1-9c70-eb2fb85ae06d"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
