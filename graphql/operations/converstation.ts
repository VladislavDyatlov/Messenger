import { gql } from "@apollo/client";

export default {
  Queries: {
    converstation: gql`
      query Converstation {
        converstation {
          id
          participants {
            user {
              id
              username
            }
            hasSeenLatestMessage
          }
          latestMessage {
            id
            sender {
              id
              username
            }
            body
            createdAt
          }
          updatedAt
        }
      }
    `,
  },
  Mutations: {
    createConverstation: gql`
      mutation CreateConverstation($particleIds: [String]!) {
        createConverstation(particleIds: $particleIds) {
          converstationId
        }
      }
    `,
  },
  Subscriptions: {
    convertstationCreated: gql`
      subscription ConvertstationCreated {
        convertstationCreated {
          id
          participants {
            user {
              id
              username
            }
            hasSeenLatestMessage
          }
          latestMessage {
            id
            sender {
              id
              username
            }
            body
            createdAt
          }
          updatedAt
        }
      }
    `,
  },
}; 