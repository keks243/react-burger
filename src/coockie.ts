export function getCookie(name:string) {
  const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: string | number | Date | boolean } = {}
) {
  props = {
      path: "/",
      ...props,
  };

  let exp = props.expires;
  if (typeof exp == "number" && exp) {
      const d:Date = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
  }
  if (exp && exp.toString) {
      props.expires = exp.toString();
  }
  value = encodeURIComponent(value);
  let updatedCookie:string = name + "=" + value;
  for (const propName in props) {
      updatedCookie += "; " + propName;
      const propValue = props[propName];
      if (propValue !== true) {
          updatedCookie += "=" + propValue;
      }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name:string) {
  setCookie(name, "", { expires: -1 });
}