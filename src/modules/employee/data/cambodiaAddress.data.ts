export type CambodiaGeoTree = Record<string, Record<string, Record<string, string[]>>>

let cachedData: CambodiaGeoTree | null = null
let fetchPromise: Promise<CambodiaGeoTree> | null = null

/**
 * Lazy loads the Cambodian Geographic Data from public
 * and caches it in memory.
 */
export const loadGeoData = async (): Promise<CambodiaGeoTree> => {
  if (cachedData) return cachedData
  if (!fetchPromise) {
    fetchPromise = fetch('/data/cambodiaGeoData.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load geo data: ${res.statusText}`)
        return res.json()
      })
      .then((data: CambodiaGeoTree) => {
        cachedData = data
        return data
      })
  }
  return fetchPromise
}

export const getProvincesFromTree = (tree: CambodiaGeoTree | null): string[] => {
  return tree ? Object.keys(tree) : []
}

export const getDistrictsFromTree = (tree: CambodiaGeoTree | null, provinceName: string): string[] => {
  if (!tree || !provinceName || !tree[provinceName]) return []
  return Object.keys(tree[provinceName])
}

export const getCommunesFromTree = (
  tree: CambodiaGeoTree | null,
  provinceName: string,
  districtName: string
): string[] => {
  if (!tree || !provinceName || !districtName || !tree[provinceName]?.[districtName]) return []
  return Object.keys(tree[provinceName][districtName])
}

export const getVillagesFromTree = (
  tree: CambodiaGeoTree | null,
  provinceName: string,
  districtName: string,
  communeName: string
): string[] => {
  if (
    !tree ||
    !provinceName ||
    !districtName ||
    !communeName ||
    !tree[provinceName]?.[districtName]?.[communeName]
  ) {
    return []
  }
  return tree[provinceName][districtName][communeName]
}
