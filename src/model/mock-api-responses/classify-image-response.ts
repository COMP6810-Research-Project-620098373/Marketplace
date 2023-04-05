import { Item } from "../Item";
import { ItemCategories } from "../ItemCategories";
import { Visibility } from "../Visibility";

export const classifyImageResponse = {
    200: <{
        className: string;
        probability: number;
    }[]>[
        {
            className: "rifle",
            probability: 0.61082715,
        },
        {
            className: "assault_rifle",
            probability: 0.15748279,
        },
        {
            className: "bassoon",
            probability: 0.037953313,
        },
        {
            className: "flute",
            probability: 0.022216225,
        },
        {
            className: "revolver",
            probability: 0.009570584,
        },
    ],
    201: {

    },
    500: {

    },
}