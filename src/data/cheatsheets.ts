import { CheatSheet } from "../types";

export const cheatSheets: CheatSheet[] = [
  {
    id: "python",
    title: "Python Cheat Sheet",
    description: "Core syntax, loops, lists comprehension, and general tricks.",
    iconName: "FileCode",
    category: "Languages",
    sections: [
      {
        title: "Lists Comprehensions",
        items: [
          { code: "squares = [x**2 for x in range(10)]", desc: "Create list of squares for 0-9 quickly." },
          { code: "even_sq = [x**2 for x in range(10) if x % 2 == 0]", desc: "Create list with conditional filters." }
        ]
      },
      {
        title: "Generators & Yielding",
        items: [
          {
            code: "def stream_range(n):\n    for i in range(n):\n        yield i\n\ngen = stream_range(1000000)",
            desc: "Declares lazy iterable saving megabytes of RAM."
          }
        ]
      },
      {
        title: "Decorators Syntax",
        items: [
          {
            code: "def log_time(func):\n    def wrapper(*args, **kwargs):\n        print(f'Calling {func.__name__}')\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_time\ndef process_data(): pass",
            desc: "Wraps function executions to add features dynamically."
          }
        ]
      }
    ]
  },
  {
    id: "numpy",
    title: "NumPy Cheat Sheet",
    description: "Fast array creations, slicing, shapes, and arithmetic.",
    iconName: "Layers",
    category: "Data Science",
    sections: [
      {
        title: "Creating Arrays",
        items: [
          { code: "import numpy as np\narr = np.array([1, 2, 3, 4])", desc: "Initialize flat 1D numpy array." },
          { code: "zeros = np.zeros((3, 4))", desc: "Create a 3x4 matrix filled with 0.0 floats." },
          { code: "rand = np.random.rand(100, 100)", desc: "Generate 100x100 matrix of uniform random values between 0-1." }
        ]
      },
      {
        title: "Array Math",
        items: [
          { code: "dot_product = np.dot(matrix_a, matrix_b)", desc: "Computes matrix dot multiplication of coordinates." },
          { code: "norm = np.linalg.norm(vector)", desc: "Calculates the Euclidean (L2) length of an embedding coordinate vector." }
        ]
      }
    ]
  },
  {
    id: "pandas",
    title: "Pandas Cheat Sheet",
    description: "DataFrames, querying, loading CSV, grouping and aggregation.",
    iconName: "Table",
    category: "Data Science",
    sections: [
      {
        title: "Loading & Viewing",
        items: [
          { code: "import pandas as pd\ndf = pd.read_csv('dataset.csv')", desc: "Load file into structural DataFrame." },
          { code: "print(df.head(5))", desc: "View the first 5 records." },
          { code: "print(df.info())", desc: "Get column datatypes, count, and memory allocation." }
        ]
      },
      {
        title: "Grouping & aggregations",
        items: [
          { code: "avg_by_group = df.groupby('category')['score'].mean()", desc: "Calculate average score grouped by category column." }
        ]
      }
    ]
  },
  {
    id: "fastapi",
    title: "FastAPI Cheat Sheet",
    description: "Declaring async routes, models, JSON-Schema, and launch scripts.",
    iconName: "Zap",
    category: "Backend",
    sections: [
      {
        title: "Basic Server Setup",
        items: [
          {
            code: "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass QueryRequest(BaseModel):\n    prompt: str\n\n@app.post('/api/generate')\nasync def generate(req: QueryRequest):\n    return {'status': 'success', 'answer': f'You said: {req.prompt}'}",
            desc: "Defines asynchronous POST route automatically validating request payloads using Pydantic schemas."
          }
        ]
      }
    ]
  },
  {
    id: "langchain",
    title: "LangChain Cheat Sheet",
    description: "LCEL syntax, runnables, prompt templates, and chat models.",
    iconName: "Workflow",
    category: "AI Engineering",
    sections: [
      {
        title: "LCEL Pipe Operations",
        items: [
          {
            code: "from langchain_core.prompts import ChatPromptTemplate\nfrom langchain_google_genai import ChatGoogleGenerativeAI\n\nmodel = ChatGoogleGenerativeAI(model='gemini-2.0-flash')\nprompt = ChatPromptTemplate.from_template('Explain {topic} in one sentence.')\n\n# Dynamic LCEL chain\nchain = prompt | model\n\nresponse = chain.invoke({'topic': 'RAG'})",
            desc: "Chains a dynamic prompt template to an LLM block via the direct bitwise OR pipe operator."
          }
        ]
      }
    ]
  },
  {
    id: "pytorch",
    title: "PyTorch Cheat Sheet",
    description: "Tensor operations, custom dataset classes, and standard training loops.",
    iconName: "Activity",
    category: "Deep Learning",
    sections: [
      {
        title: "Tensor Operations & Shapes",
        items: [
          { code: "import torch\nt = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)", desc: "Initialize float tensor." },
          { code: "reshaped = t.view(-1, 4)", desc: "Reshapes tensor dimensions (similar to reshape, view acts on continuous memory)." },
          { code: "gpu_tensor = t.to('cuda')", desc: "Transfers the tensor to GPU memory for supercharged operations." }
        ]
      },
      {
        title: "Custom Dataset Class",
        items: [
          {
            code: "from torch.utils.data import Dataset\n\nclass CustomDataset(Dataset):\n    def __init__(self, x_data, y_labels):\n        self.x = x_data\n        self.y = y_labels\n        \n    def __len__(self):\n        return len(self.x)\n        \n    def __getitem__(self, idx):\n        return self.x[idx], self.y[idx]",
            desc: "Defines standard PyTorch data ingestion class."
          }
        ]
      },
      {
        title: "Standard Training Loop",
        items: [
          {
            code: "optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\ncriterion = torch.nn.CrossEntropyLoss()\n\nfor epoch in range(epochs):\n    for x_batch, y_batch in dataloader:\n        optimizer.zero_grad()  # Reset gradient buffers\n        outputs = model(x_batch)\n        loss = criterion(outputs, y_batch)\n        loss.backward()        # Backpropagation step\n        optimizer.step()       # Update weights matrix",
            desc: "The standard five-step training iteration for PyTorch models."
          }
        ]
      }
    ]
  },
  {
    id: "gemini-sdk",
    title: "Google Gemini SDK Cheat Sheet",
    description: "Programming the modern @google/genai SDK in TypeScript/Python.",
    iconName: "Cpu",
    category: "AI Engineering",
    sections: [
      {
        title: "Initializing the Client",
        items: [
          {
            code: "import { GoogleGenAI } from '@google/genai';\n\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });",
            desc: "Initialize the official Google GenAI SDK client."
          }
        ]
      },
      {
        title: "Generating Structured JSON",
        items: [
          {
            code: "import { Type } from '@google/genai';\n\nconst response = await ai.models.generateContent({\n    model: 'gemini-2.0-flash',\n    contents: 'List 3 top programming languages',\n    config: {\n        responseMimeType: 'application/json',\n        responseSchema: {\n            type: Type.ARRAY,\n            items: { type: Type.STRING },\n        },\n    },\n});\nconsole.log(JSON.parse(response.text));",
            desc: "Enforce strict schema-compliant JSON array return."
          }
        ]
      },
      {
        title: "Multimodal and Video Input",
        items: [
          {
            code: "const videoFile = await ai.files.upload({\n    file: './interview.mp4',\n    mimeType: 'video/mp4',\n});\n\nconst response = await ai.models.generateContent({\n    model: 'gemini-2.0-flash',\n    contents: [\n        videoFile,\n        'Provide a bullet-point summary of this interview.'\n    ],\n});",
            desc: "Upload and analyze multi-megabyte video or raw audio files in seconds."
          }
        ]
      },
      {
        title: "Chat Sessions with History",
        items: [
          {
            code: "const chat = ai.chats.create({\n    model: 'gemini-2.0-flash',\n    config: { systemInstruction: 'You are a technical AI coach.' },\n});\n\nlet response = await chat.sendMessage({ message: 'Hello!' });\nresponse = await chat.sendMessage({ message: 'What did we talk about?' });",
            desc: "Create conversational threads keeping past interactions in memory automatic."
          }
        ]
      }
    ]
  }
];
