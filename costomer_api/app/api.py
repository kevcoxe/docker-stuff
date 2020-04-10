
from flask import jsonify
from app import app


costomers = [
    {
        'id': 1,
        'nam': 'Kevin Coxe',
    },
]


@app.route("/costomers")
def api_v1_get_costomers():
    return jsonify({
        'message': 'Here are my costomers',
        'data': costomers,
    }), 200
