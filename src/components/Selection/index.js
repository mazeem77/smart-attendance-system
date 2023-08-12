import React from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Layout from "../Layout";
import Signin from "@/pages/signin";
import { useApp } from "@/context/app";

function Selection({ children }) {
  const pagesWithoutLayout = ['/signin', '/signup'];
  const jwt = useSelector(state => state.userData.jwt);
  const router = useRouter();
  const shouldApplyLayout = pagesWithoutLayout.includes(router.pathname);

  return (
    <>
      {jwt !== null ?
        !shouldApplyLayout ? (
          <Layout>
            {children}
          </Layout>
        ) : (
          children
        ) : shouldApplyLayout ?
          children : <Signin />
      }
    </>
  )
}

export default Selection
