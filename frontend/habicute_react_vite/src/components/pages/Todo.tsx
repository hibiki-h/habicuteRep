import { Box, Flex } from "@chakra-ui/react";
import React, { memo } from "react";

import TodoPageFormText from "../morcules/TodoPageFormText";
import TodoPageFormTitle from "../atoms/TodoPageFormTitle";
import TodoPageTodoList from "../organisms/TodoPageTodoList";
import { useTodo } from "@/providers/ContentProvider";
import TodoPageButton from "../atoms/TodoPageButton";
import TodoPageFormClearButton from "../atoms/TodoPageFormClearButton";

const Todo = memo(() => {
  const { todoLists, formInput, setFormInput } = useTodo();

  const onChangeInputForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box>
        <Flex
          direction={"column"}
          m={{ base: "3vh 0" }}
          w={"100%"}
          pb={"clamp(50px, 6vw, 150px)"}
        >
          {todoLists?.length > 0 ? <TodoPageTodoList /> : <></>}

          <Flex
            direction={"column"}
            gap={{ base: 12, md: 14, lg: "clamp(20px, 5vw, 150px)" }}
            align={"center"}
            mt={"clamp(20px, 5vw, 100px)"}
            mb={"clamp(100px, 15vw, 250px)"}
          >
            <TodoPageFormTitle children={`具体的な指標を持った\n目標と理由`} />

            <TodoPageFormText
              children="目標"
              exampletext={`例）節約するため毎月10万円投資する　←　OK\nお金を節約する　←　NG`}
              formInputProps={formInput.title}
              InputName={"title"}
              onChangeInputForm={onChangeInputForm}
            />

            <TodoPageFormText
              children="理由"
              exampletext={`例）生活費を20万、遊びに5万\n10万を毎月投資にすることで\nお金の使い過ぎ防止とお金が増える仕組みを利用できるため`}
              formInputProps={formInput.title_reason}
              InputName={"title_reason"}
              onChangeInputForm={onChangeInputForm}
            />
          </Flex>

          <Flex
            direction={"column"}
            gap={{ base: 12, md: 14, lg: "clamp(20px, 5vw, 150px)" }}
            align={"center"}
            mt={"clamp(20px, 5vw, 100px)"}
            mb={"clamp(100px, 15vw, 250px)"}
          >
            <TodoPageFormTitle children="目標達成後に得られるもの" />

            <TodoPageFormText
              exampletext={`例）続けていれば老後の生活資金を増やしたり\nお金の自己管理ができたり\n増えた利益で家族旅行の資金を得られる`}
              formInputProps={formInput.achievement_title}
              InputName={"achievement_title"}
              onChangeInputForm={onChangeInputForm}
            />
          </Flex>

          <Flex
            direction={"column"}
            gap={{ base: 12, md: 14, lg: "clamp(20px, 5vw, 150px)" }}
            align={"center"}
            mt={"clamp(20px, 5vw, 100px)"}
            mb={"clamp(100px, 15vw, 250px)"}
          >
            <TodoPageFormTitle
              children={`目標達成するため\n「いつ」「なにをするか」を\nif ~ thenプランニングで決める`}
            />

            <TodoPageFormText
              children="if"
              exampletext={`例）給料日がきたら`}
              formInputProps={formInput.when_if}
              InputName={"when_if"}
              onChangeInputForm={onChangeInputForm}
            />

            <TodoPageFormText
              children="then"
              exampletext={`例）5万をまず投資する\nそのあとに生活資金や遊びのお金を考える`}
              formInputProps={formInput.when_then}
              InputName={"when_then"}
              onChangeInputForm={onChangeInputForm}
            />
          </Flex>

          <Flex
            direction={"column"}
            gap={{ base: 12, md: 14, lg: "clamp(20px, 5vw, 150px)" }}
            align={"center"}
            mt={"clamp(20px, 5vw, 100px)"}
            mb={"clamp(60px, 10vw, 180px)"}
          >
            <TodoPageFormTitle
              children={`目標達成の障害になるものを\nif ~ thenプランニングで決める`}
            />

            <TodoPageFormText
              children="if"
              exampletext={`例）給料日がきて、飲み会や大きな買い物などで\n投資分のお金を使いそうになったら`}
              formInputProps={formInput.obstacle_if}
              InputName={"obstacle_if"}
              onChangeInputForm={onChangeInputForm}
            />

            <TodoPageFormText
              children="then"
              exampletext={`例）そうならないよう、給料日になったら\n投資分のお金が口座から抜かれるような仕組みを\n事前に設定しておく`}
              formInputProps={formInput.obstacle_then}
              InputName={"obstacle_then"}
              onChangeInputForm={onChangeInputForm}
            />
            <TodoPageFormClearButton />
          </Flex>

          <Flex
            justify={"center"}
            position={"relative"}
            left={"20vw"}
          >
            <TodoPageButton children="ENTER" />
          </Flex>
        </Flex>
      </Box>
    </>
  );
});
export default Todo;
