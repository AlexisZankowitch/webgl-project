/**
 * Created by zank on 24/04/16.
 */
var univers = [
    {
        'galaxies': [{
            'name': 'milkyway',
            'translate': [0, 0, 0],
            'object_type': 'sphere',
            'radius': 0,
            'suns': [
                {
                    'name': 'sun',
                    'texture': "./img/sun.jpg",
                    'translate': [2, 0, 0],
                    'orbit': 0.2,
                    'revolution': 0.3,
                    'object_type': 'sphere',
                    'radius': 2,
                    'planets': [
                        {
                            'name': 'mercury',
                            'texture': "./img/mercure.jpg",
                            'translate': [3, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.1,
                            'moons': [],
                            'orbit': 0.2,
                            'revolution': 1.5
                        }, {
                            'name': 'venus',
                            'texture': "./img/venus.jpg",
                            'translate': [3.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [3.5, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.13,
                            'moons': [],
                            'orbit': 0.5,
                            'revolution': 0.8
                        }, {
                            'name': 'earth',
                            'texture': "./img/earth.jpg",
                            'translate': [4.1, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.15,
                            'moons': [
                                {
                                    'name': 'moon',
                                    'texture': "./img/moon.gif",
                                    'translate': [0.2, 0, 0],
                                    'rotate': {
                                        '1': 'Math.PI/12',
                                        '2': [0, 0, 1]
                                    },
                                    'scale': [1, 1, 1],
                                    'object_type': 'sphere',
                                    'radius': 0.02,
                                    'orbit': 1,
                                    'revolution': 1
                                }
                            ],
                            'orbit': 1,
                            'revolution': 1
                        },
                        {
                            'name': 'mars',
                            'texture': "./img/mars.jpg",
                            'translate': [4.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.11,
                            'moons': [],
                            'orbit': 1.2,
                            'revolution': 1
                        }
                        , {
                            'name': 'jupiter',
                            'texture': "./img/jupiter.jpg",
                            'translate': [6.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.85,
                            'moons': [],
                            'orbit': 0.7,
                            'revolution': 2
                        }, {
                            'name': 'saturne',
                            'texture': "./img/saturn.png",
                            'translate': [9, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.7,
                            'moons': [],
                            'orbit': 1.5,
                            'revolution': 0.5
                        }, {
                            'name': 'uranus',
                            'texture': "./img/uranus.png",
                            'translate': [11, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.4,
                            'moons': [],
                            'orbit': 1,
                            'revolution': 1
                        }, {
                            'name': 'neptune',
                            'texture': "./img/neptune.jpg",
                            'translate': [12.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': 'sphere',
                            'radius': 0.5,
                            'moons': [],
                            'orbit': 1.3,
                            'revolution': 0.2
                        }
                    ]
                },
                {
                    'name': 'sun',
                    'texture': "./img/sun.jpg",
                    'translate': [-20, -15, 0],
                    'orbit': 0.1,
                    'revolution': 0.3,
                    'object_type': 'sphere',
                    'radius': 2,
                    'planets': []
                }
                ,
                {
                    'name': 'sun',
                    'texture': "./img/sun.jpg",
                    'translate': [20, 10, 0],
                    'orbit': 0.1,
                    'revolution': 0.3,
                    'object_type': 'sphere',
                    'radius': 2,
                    'planets': []
                }
            ]
        }]
    }
];