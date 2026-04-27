import Algorithm from '../models/Algorithm.js';

class AlgorithmService {
  
  async buildSearchQuery(filters) {
    const query = { isActive: true };

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.difficulty) {
      query.difficulty = filters.difficulty;
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { 'description.short': { $regex: filters.search, $options: 'i' } },
        { tags: { $in: [new RegExp(filters.search, 'i')] } },
      ];
    }

    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    return query;
  }

  async findWithPagination(query, options) {
    const {
      page = 1,
      limit = 12,
      sortBy = '-createdAt',
      select = '-codeSnippets.code',
    } = options;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Algorithm.find(query)
        .select(select)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean(),
      Algorithm.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    };
  }

  async getRelatedAlgorithms(algorithmId, limit = 5) {
    const algorithm = await Algorithm.findById(algorithmId);
    
    if (!algorithm) return [];

    return Algorithm.find({
      _id: { $ne: algorithmId },
      category: algorithm.category,
      isActive: true,
    })
      .select('name slug category difficulty description.short')
      .limit(limit)
      .lean();
  }
}

export default new AlgorithmService();
