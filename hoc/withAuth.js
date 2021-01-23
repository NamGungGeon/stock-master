import auth from "../observables/auth";

export const withAuth = WrappedComponent => {
  const Component = props => {
    if (props.auth) {
      const { access, refresh } = props.auth;
      auth.set(access, refresh);
    }
    return <WrappedComponent {...props} />;
  };

  return Component;
};
