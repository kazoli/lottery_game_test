import { useState, useEffect } from 'react';
import { scrollToElement } from '../../logics/general/middlewares';
import Loading from './general/Loading';
import Header from './header/Header';
import JumpTop from './general/JumpTop';

type tProps = {
  children: JSX.Element;
  loading?: boolean;
};

function DefaultLayout(props: tProps) {
  useEffect(() => {
    // scroll top in case of page change
    scrollToElement();
  }, []);

  return (
    <>
      {props.loading && <Loading />}
      <Header />
      <main className="flex">
        <div className="content-positioner flex-[10000_10000_auto]">{props.children}</div>
      </main>
      <JumpTop />
    </>
  );
}

export default DefaultLayout;
