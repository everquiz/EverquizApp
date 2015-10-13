'use strict';

describe('ResultFactory', function () {
    var resultFactory, $httpBackend, quiz, $http;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_resultFactory_, _$httpBackend_, _$http_) {
            resultFactory = _resultFactory_;
            $httpBackend = _$httpBackend_;
            $http = _$http_;
            quiz = {
                "_id": "55f5d7b342e173cf0e3c6296",
                "category": "55f5d3dc8ebd44bd0ef74484",
                "title": "Basics",
                "description": "Язык HTML является лидирующим языком для создания веб-станиц. HTML предоставляет простой в изучении инструмент для описания структуры гипертекстовых данных.\n\nВ сочетании с CSS, для описания отображения текстовой информации, и JavaScript, для добавления динамики, HTML позволяет создавать веб-приложения различного уровня сложности.\n\nЗнание HTML необходимо каждому веб-разработчику, так как это немаловажный инструмент для создания качественных ресурсов в сети Интернет.",
                "questions": [
                    {
                        "_id": "55f69fe0c742ab5a0c633c70",
                        "text": "Какой атрибут тега <td> указывает количество столбцов, занимаемых ячейкой ?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a1a6c742ab5a0c633c7a",
                                "text": "colspan"
                            },
                            {
                                "_id": "55f6a1acc742ab5a0c633c7b",
                                "text": "сells"
                            },
                            {
                                "_id": "55f6a1b4c742ab5a0c633c7c",
                                "text": "cols"
                            },
                            {
                                "_id": "55f6a1bbc742ab5a0c633c7d",
                                "text": "rowspan"
                            },
                            {
                                "_id": "55f6a1c2c742ab5a0c633c7e",
                                "text": "merge"
                            }
                        ]
                    },
                    {
                        "_id": "55f69fe8c742ab5a0c633c71",
                        "text": "Что адресует следующая ссылка?\n<a href=\"../images/1.jpg\" />",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a200c742ab5a0c633c7f",
                                "text": "изображение, расположенное в каталоге \"images\", дочернем по отношению к текущему."
                            },
                            {
                                "_id": "55f6a207c742ab5a0c633c80",
                                "text": "изображение, расположенное в каталоге \"images\", родительском по отношению к текущему."
                            },
                            {
                                "_id": "55f6a213c742ab5a0c633c81",
                                "text": "изображение, расположенное в каталоге \"images\", который расположен в родительском по отношению к текущему каталогу."
                            }
                        ]
                    },
                    {
                        "_id": "55f69ff8c742ab5a0c633c73",
                        "text": "Какой код HTML выровняет текст по центру (выберите все подходящие варианты)?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a269c742ab5a0c633c87",
                                "text": "<nobr>Текст</nobr>"
                            },
                            {
                                "_id": "55f6a26fc742ab5a0c633c88",
                                "text": "<center>Текст</center>"
                            },
                            {
                                "_id": "55f6a275c742ab5a0c633c89",
                                "text": "<p align=\"center\">Текст</p>"
                            },
                            {
                                "_id": "55f6a27cc742ab5a0c633c8a",
                                "text": "<p align=\"justify\">Текст</p>"
                            }
                        ]
                    },
                    {
                        "_id": "55f6a000c742ab5a0c633c74",
                        "text": "Выберите фрагмент html-кода, выравнивающего текст ячейки таблицы по левому краю.",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a291c742ab5a0c633c8b",
                                "text": "<td align=\"left\">"
                            },
                            {
                                "_id": "55f6a296c742ab5a0c633c8c",
                                "text": "<td left=\"true\">"
                            },
                            {
                                "_id": "55f6a29bc742ab5a0c633c8d",
                                "text": "<td align=\"west\">"
                            },
                            {
                                "_id": "55f6a29fc742ab5a0c633c8e",
                                "text": "<td textAlign=\"left\">"
                            }
                        ]
                    },
                    {
                        "_id": "55f6a008c742ab5a0c633c75",
                        "text": "Введите (в нижнем регистре) название атрибута тега <form>, с помощью которого можно задать УРЛ, на который передаются данные введенные в форму.",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a2c5c742ab5a0c633c8f",
                                "text": "action"
                            }
                        ]
                    },
                    {
                        "_id": "55f6a017c742ab5a0c633c77",
                        "text": "Как добавить favicon на страницу?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a30ac742ab5a0c633c96",
                                "text": "<link href=\"/favicon.ico\" rel=\"shortcut icon\" type=\"image/x-icon\" />"
                            },
                            {
                                "_id": "55f6a311c742ab5a0c633c97",
                                "text": "<link href=\"/favicon.ico\" type=\"image/x-icon\" />"
                            },
                            {
                                "_id": "55f6a318c742ab5a0c633c98",
                                "text": "<link href=\"/favicon.png\" rel=\"shortcut icon\" type=\"image/png\" />"
                            }
                        ]
                    },
                    {
                        "_id": "55f6a01ec742ab5a0c633c78",
                        "text": "Что означает тег <tbody> в таблице?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a32cc742ab5a0c633c99",
                                "text": "Совместное использование <TBODY> и <TABLE> невозможно."
                            },
                            {
                                "_id": "55f6a335c742ab5a0c633c9a",
                                "text": "Элемент <TBODY> предназначен для хранения одной или нескольких строк таблицы."
                            },
                            {
                                "_id": "55f6a33cc742ab5a0c633c9b",
                                "text": "Элемент <TBODY> предназначен для объявления начала таблицы."
                            }
                        ]
                    },
                    {
                        "_id": "55f69ff0c742ab5a0c633c72",
                        "text": "Как будет отображаться следующий элемент?\n<input name=\"Name\" type=\"hidden\" value=\"Hello World\" />",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a23ec742ab5a0c633c82",
                                "text": "Поле ввода со значением \"********\""
                            },
                            {
                                "_id": "55f6a243c742ab5a0c633c83",
                                "text": "Пустое поле ввода"
                            },
                            {
                                "_id": "55f6a248c742ab5a0c633c84",
                                "text": "Текст \"Hello World\""
                            },
                            {
                                "_id": "55f6a24fc742ab5a0c633c85",
                                "text": "Ничего отображаться не будет"
                            },
                            {
                                "_id": "55f6a255c742ab5a0c633c86",
                                "text": "Поле ввода с текстом \"Hello World\""
                            }
                        ]
                    },
                    {
                        "_id": "55f6a011c742ab5a0c633c76",
                        "text": "Как создать нумерованный список?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a2d8c742ab5a0c633c90",
                                "text": "<ul>"
                            },
                            {
                                "_id": "55f6a2dfc742ab5a0c633c91",
                                "text": "<ol>"
                            },
                            {
                                "_id": "55f6a2e4c742ab5a0c633c92",
                                "text": "<li>"
                            },
                            {
                                "_id": "55f6a2e9c742ab5a0c633c93",
                                "text": "<list>"
                            },
                            {
                                "_id": "55f6a2f0c742ab5a0c633c94",
                                "text": "<list type=\"number\">"
                            },
                            {
                                "_id": "55f6a2f6c742ab5a0c633c95",
                                "text": "<list type=\"ordered\">"
                            }
                        ]
                    },
                    {
                        "_id": "55f6a025c742ab5a0c633c79",
                        "text": "Следующий фрагмент кода создает список:<ul>  \n<li>элемент 1</li>  \n<li>элемент 2</li> \n<li>элемент 3</li> \n</ul>\nЧто верно о созданном списке ?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f6a37dc742ab5a0c633c9c",
                                "text": "Каждый элемент списка будет начинаться с номера по порядку"
                            },
                            {
                                "_id": "55f6a383c742ab5a0c633c9d",
                                "text": "Будет создан неупорядоченный список"
                            },
                            {
                                "_id": "55f6a38ac742ab5a0c633c9e",
                                "text": "Каждый элемент списка будет начинаться с маркера"
                            },
                            {
                                "_id": "55f6a38fc742ab5a0c633c9f",
                                "text": "Будет создан упорядоченный список"
                            },
                            {
                                "_id": "55f6a396c742ab5a0c633ca0",
                                "text": "Тип созданного списка зависит от браузера"
                            }
                        ]
                    },
                    {
                        "_id": "55f74116db53bce80e724113",
                        "text": "Как расшифровывается HTML?",
                        "quiz": "55f5d7b342e173cf0e3c6296",
                        "answers": [
                            {
                                "_id": "55f741a06e6c4f501413b040",
                                "text": "HyperThread Mask Language"
                            },
                            {
                                "_id": "55f741aa6e6c4f501413b041",
                                "text": "HyperThread Markup Language"
                            },
                            {
                                "_id": "55f741b06e6c4f501413b042",
                                "text": "HyperText Mask Language"
                            },
                            {
                                "_id": "55f741b86e6c4f501413b043",
                                "text": "HyperText Markup Language"
                            }
                        ]
                    }
                ],
                "status": 1,
                "editedAt": "2015-09-13T19:52:14.465Z",
                "createAt": "2015-09-13T19:52:14.465Z",
                "__v": 0,
                "complexity": 0
            };
        })
    );

    it('should check and return calculated result', function () {
        $httpBackend.whenPUT('/checkresult').respond({
            data: 0
        });

        var result;
        //resultFactory.checkResult(quiz);

        $http.put('/checkresult');
        expect(result).to.be.empty;
        //expect(result).to.be.instanceof(Array);
        //expect(result).to.have.length(0);

        $httpBackend.flush();

        expect(result).not.to.be.empty;
        //expect(result).to.be.instanceof(Array);
        //expect(result).to.have.length(3);
        //expect(result).deep.equal(achievements);
    });
});