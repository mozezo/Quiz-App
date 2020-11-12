import React, { Suspense, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import Loading from '../../components/Loading/Loading';
import  Navbar from "../../components/Navbar/Navbar";
import Routes from "../../Routes";


function DefaultLayout({ history }) {
   let { pathname } = history.location;

    // const { i18n, t } = useTranslation();
    //const align = t("align");
    //const [langDir, setLangDir] = useState(i18n.dir());
    //   const changeLang = lang => {
    //     let newLang = lang === "en" || lang === "en-US" ? "ar" : "en";
    //     i18n.changeLanguage(newLang);
    //     setLangDir(i18n.dir());
    //   };
  return (
    <div>
        {pathname === "/" ? (
            ''
            ) : (
            <>
                <Navbar />
            </>
            )
        }
      <div className="main" >
        <Suspense fallback={<Loading />}>
          <Switch>
            {Routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => <route.component {...props} />}
                />
              ) : null;
            })}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default DefaultLayout;
