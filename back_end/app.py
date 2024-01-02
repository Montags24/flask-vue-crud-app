from flask import Flask, jsonify, request
from flask_cors import CORS


# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

BOOKS = [
    {"title": "On the Road", "author": "Jack Kerouac", "read": True},
    {
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J. K. Rowling",
        "read": False,
    },
    {"title": "Green Eggs and Ham", "author": "Dr. Seuss", "read": True},
]


# sanity check route
@app.route("/ping", methods=["GET"])
def ping_pong():
    return jsonify("pong!")


# sanity check route
@app.route("/api_get_books", methods=["GET"])
def api_get_books():
    api_package = dict(rc=0, books=BOOKS)
    return api_package


@app.route("/api_add_book", methods=["POST"])
def api_add_book():
    try:
        api_package = request.json
        print(api_package)
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try  again ",
        )

    title = api_package["title"]
    author = api_package["author"]
    read = api_package["read"]

    BOOKS.append({"title": title, "author": author, "read": read})
    return dict(
        rc=0,
        message=f"the API request was successful in adding the book",
    )


@app.route("/api_delete_book", methods=["POST"])
def api_delete_book():
    try:
        api_package = request.json
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try  again ",
        )

    index = api_package["index"]
    try:
        BOOKS.pop(index)
    except IndexError:
        return dict(
            rc=16,
            message=f"Index out of range",
        )
    return dict(
        rc=0,
        message=f"the API request was successful in deleting the book",
    )


@app.route("/api_edit_book", methods=["POST"])
def api_edit_book():
    try:
        api_package = request.json
    except Exception as err:
        app.logger.exception(f"[EXCEPTION] err was {err}")
        # throttle it
        # We need to do a throttle here that will not block the whole flask process
        return dict(
            rc=16,
            message=f"The api request was badly formed - please try  again ",
        )

    title = api_package["title"]
    author = api_package["author"]
    read = api_package["read"]
    index = api_package["index"]
    try:
        BOOKS[index]["title"] = title
        BOOKS[index]["author"] = author
        BOOKS[read]["title"] = read
    except IndexError:
        return dict(
            rc=16,
            message=f"Index out of range",
        )
    return dict(
        rc=0,
        message=f"the API request was successful in editing the book",
    )


if __name__ == "__main__":
    app.run()
