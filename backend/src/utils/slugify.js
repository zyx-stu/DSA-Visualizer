import slugifyLib from 'slugify';

export const generateSlug = (text) => {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
};
