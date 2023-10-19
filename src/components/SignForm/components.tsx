import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BorderButton } from '../Button';

type OtherOptionsProps = {
  otherOptionSubtext: string;
  otherOptionTitle: string;
  otherOptionLink: string;
};

export const OtherOptions = memo(function OtherOptions({
  otherOptionSubtext,
  otherOptionTitle,
  otherOptionLink,
}: OtherOptionsProps) {
  return (
    <div className='other-option'>
      <span className='subtext'>{otherOptionSubtext}</span>
      <Link className='link' to={otherOptionLink}>
        {otherOptionTitle}
      </Link>
    </div>
  );
});

type GoogleBtnProps = {
  googleBtnTitle: string;
  loginGoogleURL: string;
};

export const GoogleBtn = memo(function GoogleBtn({
  loginGoogleURL,
  googleBtnTitle,
}: GoogleBtnProps) {
  return (
    <BorderButton size='m' fullWidth>
      <div className='google-btn'>
        <FcGoogle />
        <a className='google-btn__text' href={loginGoogleURL} role='button'>
          {googleBtnTitle}
        </a>
      </div>
    </BorderButton>
  );
});
