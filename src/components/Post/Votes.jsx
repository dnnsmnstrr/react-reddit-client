/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-ui/core";
import UpVote from "@material-ui/icons/ExpandLess";
import DownVote from "@material-ui/icons/ExpandMore";

const upvoteColor = "#FF8b60";
const downvoteColor = "#9494FF";

const root = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: auto 4% auto 0;
`;
const iconButtonCss = css`
  padding: 7px 0;
  width: 40px;
`;

const VoteState = {
  UPVOTE: 1,
  NO_VOTE: 0,
  DOWNVOTE: -1
};

function getColorByState(voteState) {
  switch (voteState) {
  case VoteState.UPVOTE:
    return upvoteColor;
  case VoteState.DOWNVOTE:
    return downvoteColor;
  default:
    return 'inherit';
  }
}

function kFormatter(num) {
  return num > 999 ? 
    (num / 1000).toFixed(1) + 'k' 
    : num;
}

function Votes(props) {
  const [voteState, setVoteState] = useState(VoteState.NO_VOTE);

  const handleVote = nextState => () => {
    if (nextState === voteState) setVoteState(VoteState.NO_VOTE);
    else setVoteState(nextState);
  };

  const currentColor = getColorByState(voteState);
  const makeButtonCss = desiredButtonState => css`
    ${iconButtonCss};
    ${voteState === desiredButtonState && `color: ${currentColor};`}
  `;
  const upButtonCss = makeButtonCss(VoteState.UPVOTE);
  const downButtonCss = makeButtonCss(VoteState.DOWNVOTE);
  const textCss = (voteState === VoteState.NO_VOTE) ? css`` : 
    css`
      color: ${currentColor};
    `;
  return (
    <div css={root}>
      <IconButton
        css={upButtonCss} aria-label="Upvote" 
        onClick={handleVote(VoteState.UPVOTE)}
      >
        <UpVote />
      </IconButton>

      <Typography variant="h5" css={textCss}>
        {kFormatter(props.votes + voteState)}
      </Typography>

      <IconButton
        css={downButtonCss} aria-label="Downvote"
        onClick={handleVote(VoteState.DOWNVOTE)}
      >
        <DownVote />
      </IconButton>
    </div>
  );
}

Votes.propTypes = {
  votes: PropTypes.number.isRequired
};

export default Votes;
