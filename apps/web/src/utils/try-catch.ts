type Success<T> = {
  data: T;
  error: null;
};

type Fail<E = Error> = {
  data: null;
  error: E;
};

export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Success<T> | Fail<E>> {
  try {
    const res = await promise;

    return {
      data: res,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err as E,
    };
  }
}
