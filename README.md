# React/Redux-Saga 를 이용해 만드는 ToDoList
배운 내용을 잘 하고 있는지 확인하기 위해 만들어봅니다.

## npm Download List
* react
* react-dom
    - (For Web) Document Object Model
* prop-types
    - prop 검사
* next
    - (For Code-Splitting/Server Side Rendering) react의 Framework
    - 실행을 위해 "scripts" : { "dev": next },
        ```npm run dev```
* redux
* react-redux
* react-redux@next
* next-redux-wrapper
* redux-saga
* immer
    - redux-saga의 prevent immutable
* antd
    - Ant Design을 이용하여 제작
* styled-components
### devDependencies (개발 시에만 사용)
* nodemon
* webpack
* babel-plugin-styled-components
    - styled-components의 오류...?
    - .babelrc
        ```
        {
            "presets": ["next/babel"],
            "plugins": [
                [
                    "styled-components",
                    {
                        "ssr" : true,
                        "displayName" : true,
                        "preprocess" : false
                    }
                ]
            ]
        }
        ```
