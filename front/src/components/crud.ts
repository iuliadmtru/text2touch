/**
 * 	Post Method Template for Api
 * @param url api endpoint
 * @param bodyContent payload
 * @param headerOptions
 * @returns data Promise
 */
export async function postMethod(
  url: string,
  bodyContent: string,
  headerOptions = { "Content-Type": "application/json" }
): Promise<Response | void> {
  const requestOptions = {
    method: "POST",
    headers: headerOptions,
    body: bodyContent,
  };

  return fetch(url, requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");

      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Get Method Template for Api
 * @param url api endpoint
 * @param params endpoint parameters if exist
 * @returns data promise
 */
export async function getMethod(
  url: string,
  params?: string
): Promise<Response> {
  return fetch(url)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");

      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
