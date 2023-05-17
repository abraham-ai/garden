import type Creation from '../interfaces/Creation'

const getUniqueCreations = (creations: Creation[]): Creation[] => {
	const uniqueCreations: Creation[] = []
	const ids = new Set()

	for (const creation of creations) {
		if (!ids.has(creation._id)) {
			uniqueCreations.push(creation)
			ids.add(creation._id)
		}
	}

	return uniqueCreations
}

export default getUniqueCreations
