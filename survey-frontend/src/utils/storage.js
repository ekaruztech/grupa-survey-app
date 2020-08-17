/**
 * Simply set item to storage.
 *
 * @param storage
 * @param key
 * @param value
 * @returns {*}
 */
function setItem(storage, key, value) {
  return storage.setItem(key, value);
}

/**
 * Simply get item from storage.
 *
 * @param storage
 * @param key
 * @returns {*}
 */
function getItem(storage, key) {
  return storage.getItem(key);
}

/**
 * Simply remove item from storage.
 *
 * @param storage
 * @param key
 */
function removeItem(storage, key) {
  return storage.removeItem(key);
}

/**
 * Clear storage.
 *
 * @param storage
 */
function clear(storage) {
  storage.clear();
}

/**
 * Checks if storage has value with provided key.
 * Return true if has.
 *
 * @param storage
 * @param key
 * @returns {boolean}
 */
function has(storage, key) {
  return getItem(storage, key) !== null;
}

/**
 * Process and save item to storage. Handle different types.
 *
 * @param storage
 * @param key
 * @param value
 * @returns {*}
 */
function set(storage, key, value) {
  // Return false if value or key not provided
  if (typeof key === 'undefined' || typeof value === 'undefined') {
    return false;
  }

  // Stringify object.
  if (typeof value === 'object' && value !== null) {
    value = JSON.stringify(value);
  }

  // Try to save to storage.
  try {
    setItem(storage, key, value);
  } catch (e) {
    return false;
  }

  // Return true if saving successful.
  return true;
}

/**
 * Retrieve item from storage and process. Handle different types.
 *
 * @param storage
 * @param key
 * @returns {*}
 */
function get(storage, key) {
  // Return false if key is not provided.
  if (typeof key === 'undefined') {
    return false;
  }

  // Get stored data from storage.
  var storedData = getItem(storage, key),
    value;

  // Try parse as json.
  try {
    value = JSON.parse(storedData);
  } catch (e) {
    value = storedData;
  }

  // Return value.
  return value;
}

/**
 * Remove key from storage.
 *
 * @param storage
 * @param key
 */
function remove(storage, key) {
  // Return false if key is not provided.
  if (typeof key === 'undefined') {
    return false;
  }
  // Check if key exist in storage.
  if (has(storage, key)) {
    // Remove if exist.
    removeItem(storage, key);

    // Return true.
    return true;
  }
  // Return false if key doesnt exist in storage.
  return false;
}

const createStorage = storage => ({
  set: set.bind(null, storage),
  get: get.bind(null, storage),
  has: has.bind(null, storage),
  remove: remove.bind(null, storage),
  clear: clear.bind(null, storage),
});

const LocalStorage = createStorage(window.localStorage);

export { LocalStorage };
