import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";

export default async function handle(req, res) {
    await mongooseConnect();
    const { categories, sort, phrase, ...filters } = req.query;
    let [sortField, sortOrder] = (sort || '_id-desc').split('-');

    const toursQuery = {};
    if (categories) {
        toursQuery.category = categories.split(',');
    }
    if (phrase) {
        toursQuery['$or'] = [
            { title: { $regex: phrase, $options: 'i' } },
            { description: { $regex: phrase, $options: 'i' } },
        ];
    }
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(filterName => {
            toursQuery['properties.' + filterName] = filters[filterName];
        });
    }
    console.log(toursQuery);
    res.json(await Tour.find(
        toursQuery,
        null,
        {
            sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 }
        })
    );
}