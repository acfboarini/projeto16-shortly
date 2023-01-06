const errorTypes = {
  400: "bad_request",
  401: "unauthorized",
  404: "not_found",
  409: "conflict",
  422: "processable_entity",
};

export function errorFactory({ code, message = null }) {
  if (message) return { code, type: errorTypes[code], message };
  return { code, type: errorTypes[code] }
}