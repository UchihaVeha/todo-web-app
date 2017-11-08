// @flow
import Joi from 'joi-browser';

type Return<P> = {
  isValid: boolean,
  errors: $ObjMap<P, (f: () => any) => string | null>
};

export default <S: { [string]: Object }>(
  value: Object,
  scheme: S,
  options: Object = { abortEarly: false, allowUnknown: true }
): Return<S> => {
  const { error } = Joi.validate(value, scheme, options);
  const defaultFields = Object.keys(scheme).reduce(
    (a, v) => ({ ...a, [v]: null }),
    {}
  );
  if (error === null) {
    return { isValid: true, errors: defaultFields };
  }
  const errorFields = error.details.reduce(
    (a, v) => ({
      ...a,
      [v.context.key]: v.message
    }),
    {}
  );
  return { isValid: false, errors: { ...defaultFields, ...errorFields } };
};
