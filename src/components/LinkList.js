import React from 'react';
import Link from './Link';

import { useQuery, gql } from '@apollo/client';

export const FEED_QUERY = gql`
  {
    links(first:100, skip:1) {
      id
      url
      description
      postedBy {
        username
      }
      votes(first:10) {
         edges {
           node {
            id
            user {
              id
            }
          }
        }
      }
      
      
    }
  }
`;


const LinkList = () => {

    const { data } = useQuery(FEED_QUERY);
  
    return (
      <div>
        {data && (
          <>
            {data.links.map((link) => (
              <Link key={link.id} link={link} />
            ))}
          </>
        )}
      </div>
    );
  };

export default LinkList;