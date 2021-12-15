# Data Bunch
DataBunch is a library based on the OBSERVER design pattern.
It is designed to subscribe to data and makes it easy to use.

### Installation
    npm i data-bunch

First, we must ```import DataBunch from "data-bunch";```

### Usage

DataBunch is a class and as a props of the constructor, you can specify an object, and in the object - 2 properties.
- initialValues (object)
- watcher (function)

```
const initialValues = {
    users: [],
    profile: {}
};

const watcher = (allValues = {}) => {
    console.info(allValues);
};

const dataBunch = new DataBunch({ initialValues, watcher });
```
Instance of DataBunch has 4 methods.
- .set
- .get
- .subscribe
- .reset

```
dataBunch.set({
    "users": [{ id: 1 }, { id: 2 }, { id: 3 }],
    "profile": prevValue => ({ ...prevValue, ...{} })
});

const { users, profile } = dataBunch.get("users", "profile");

const subscription = dataBunch.subscribe({
    "users": value => console.info("users", value),
    "profile": value => console.info("profile", value),
});

subscription.unsubscribe(); // users, profile

subscription.unsubscribe("users"); // users

dataBunch.reset("users", "profile"); // back to the initial values

```# data-bunch
# data-bunch
