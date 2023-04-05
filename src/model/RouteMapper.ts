export const RouteEntries = Object.freeze({
    home: "home",
    account: "account",
    browse: "browse",
    myItems: "my-items",
    addItem: "add-item",
    item: "item"
})

export const RouteMapper = Object.freeze({
    home: RouteEntries.home,
    browse: [RouteEntries.home, RouteEntries.browse].join("/"),
    account: [RouteEntries.home, RouteEntries.account].join("/"),
    myItems: [RouteEntries.home, RouteEntries.myItems].join("/"),
    addItem: [RouteEntries.home, RouteEntries.myItems, RouteEntries.addItem].join("/"),
    item: [RouteEntries.home, RouteEntries.item].join("/"),
})