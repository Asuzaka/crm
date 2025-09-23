import { Document, Query } from "mongoose";

interface QueryString {
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
  [key: string]: any; // Allowing extra params
}

export class apiFeatures<T extends Document> {
  private query: Query<T[], T>; // query Model
  private queryString: QueryString; // query params

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((element) => {
      delete queryObj[element];
    });

    // Advanced Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(lte|lt|gt|gte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find({
      ...this.query.getFilter(), // merge existing conditions
      ...JSON.parse(queryString), // merge new filter
    });
    return this;
  }

  search(fields: string[] = []): this {
    if (this.queryString.search && fields.length > 0) {
      const query = this.queryString.search;

      const orConditions = fields.map((field) => ({
        [field]: { $regex: query, $options: "i" },
      }));

      this.query = this.query.find({
        ...this.query.getFilter(), // merge existing conditions
        $or: orConditions,
      });
    }
    return this;
  }

  pagination(): this {
    let page = Number(this.queryString.page) || 1;
    let limit = Number(this.queryString.limit) || 7;

    let skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-_id");
    }
    return this;
  }

  getQuery(): Query<T[], T> {
    return this.query;
  }
}
