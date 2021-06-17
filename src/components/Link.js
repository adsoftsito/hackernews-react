import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { FEED_QUERY } from './LinkList';

/*const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.description} : ({link.url})
      </div>
    </div>
  );
};

export default Link;*/
const VOTE_MUTATION = gql`
  mutation createVote($linkId: Int!) {
    createVote(linkId: $linkId) {
      user {
        username
        email
      }
      link {
        url
        description
      }
    }
  }
`;

const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    },
    onCompleted: ({ createVote }) => {
      console.log(createVote);
    },
   update(cache, { data: { vote } }) {
      const { links } = cache.readQuery({
        query: FEED_QUERY
      });

    const updatedLinks = links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes.edges, vote]
          };
        }
        return feedLink;
      });

    cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks
          }
        }
    }); 
  }
})

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        
        <span className="gray">{props.index + 1}.</span>

        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
        {link.id} - {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.edges.length} votes | by{' '}
            {link.postedBy ? link.postedBy.username : 'Unknown'}{' '}
            {timeDifferenceForDate(Date().toLocaleString())}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;