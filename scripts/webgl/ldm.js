/**
 * Created by zank on 24/04/16.
 */


var universe_ldm = [
    {
        'galaxies': [{
            'name': 'milkyway',
            'translate': [0, 0, 0],
            'object_type': 'galaxy',
            'texture': tabTextures.universe[0],
            'radius': 800,
            'orbit': 0,
            'revolution': 0.001,
            'suns': [
                {
                    'name': 'Solar',
                    'texture': tabTextures.suns[0][0].texture,
                    'lightning': tabTextures.suns[0][0].lightning,
                    'translate': [1, 0, 0],
                    'orbit': 0,
                    'revolution': 0.3,
                    'object_type': objectType.spheres[1],
                    'radius': 2,
                    'planets': [
                        {
                            'name': 'mercury',
                            'texture': tabTextures.planets[3],
                            'translate': [3, 0, 1],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.1,
                            'moons': [],
                            'orbit': 0.2,
                            'revolution': 1.5
                        }, {
                            'name': 'venus',
                            'texture': tabTextures.planets[8],
                            'translate': [3.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [3.5, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.13,
                            'moons': [],
                            'orbit': 0.5,
                            'revolution': 0.8
                        }, {
                            'name': 'earth',
                            'texture': tabTextures.planets[0],
                            'translate': [4.1, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.15,
                            'moons': [
                                {
                                    'name': 'moon',
                                    'texture': tabTextures.planets[4],
                                    'translate': [0.2, 0, 0],
                                    'rotate': {
                                        '1': 'Math.PI/12',
                                        '2': [0, 0, 1]
                                    },
                                    'scale': [1, 1, 1],
                                    'object_type': objectType.spheres[2],
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
                            'texture': tabTextures.planets[2],
                            'translate': [4.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.11,
                            'moons': [],
                            'orbit': 1.2,
                            'revolution': 1
                        }
                        , {
                            'name': 'jupiter',
                            'texture': tabTextures.planets[1],
                            'translate': [6.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.85,
                            'moons': [],
                            'orbit': 0.7,
                            'revolution': 2
                        }, {
                            'name': 'saturne',
                            'texture': tabTextures.planets[6],
                            'translate': [9, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.7,
                            'moons': [],
                            'orbit': 1.5,
                            'revolution': 0.5
                        }, {
                            'name': 'uranus',
                            'texture': tabTextures.planets[7],
                            'translate': [11, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.4,
                            'moons': [],
                            'orbit': 1,
                            'revolution': 1
                        }, {
                            'name': 'neptune',
                            'texture': tabTextures.planets[5],
                            'translate': [12.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.5,
                            'moons': [],
                            'orbit': 1.3,
                            'revolution': 0.2
                        }
                    ]
                },
                {
                    'name': 'Hyoptra',
                    'texture': tabTextures.suns[1][0].texture,
                    'lightning': tabTextures.suns[1][0].lightning,
                    'translate': [121, 17, 30],
                    'orbit': 0,
                    'revolution': 0.3,
                    'object_type': objectType.spheres[1],
                    'radius': 2,
                    'planets': [
                        {
                            'name': 'jupiter',
                            'texture': tabTextures.planets[1],
                            'translate': [6.5, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.85,
                            'moons': [],
                            'orbit': 0.7,
                            'revolution': 2
                        }
                    ]
                }
                ,
                {
                    'name': 'Atlarus',
                    'texture': tabTextures.suns[2][0].texture,
                    'lightning': tabTextures.suns[2][0].lightning,
                    'translate': [-200, 10, 50],
                    'orbit': 0,
                    'revolution': 0.3,
                    'object_type': objectType.spheres[1],
                    'radius': 2,
                    'planets': []
                }
                ,
                {
                    'name': 'Liore',
                    'texture': tabTextures.suns[3][0].texture,
                    'lightning': tabTextures.suns[3][0].lightning,
                    'translate': [200, 0, 50],
                    'orbit': 0,
                    'revolution': 0.3,
                    'object_type': objectType.spheres[1],
                    'radius': 2,
                    'planets': [
                        {
                            'name': 'saturne',
                            'texture': tabTextures.planets[4],
                            'translate': [9, 0, 0],
                            'rotate': {
                                '1': 'Math.PI/12',
                                '2': [0, 0, 1]
                            },
                            'scale': [1, 1, 1],
                            'object_type': objectType.spheres[2],
                            'radius': 0.7,
                            'moons': [],
                            'orbit': 1.5,
                            'revolution': 0.5
                        }
                    ]
                }
            ]
        }]
    }
];