import prisma from "../lib/prisma.js";


export const getChats = async (req, res) => {
const tokenUserId = req.userId;
  
  try {
    const chats = await prisma.chat.findMany({
      where:{
        userIDs:{
          hasSome:[tokenUserId]
        }
      }
    });

    for(const chat of chats){
      const recieverId = chat.userIDs.find((id)=> id !== tokenUserId);

      const reciever = await prisma.user.findUnique({
        where:{
          id:recieverId,
        },
        select:{
          id:true,
          username:true,
          avatar:true,
        }
      });
      chat.reciever = reciever;
    }
    return res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where:{
        id:req.params.id,
        userIDs:{
          hasSome:[tokenUserId],
        },
      },
      include:{
        messages:{
          orderBy:{
            createdAt:"asc",
          }
        }
      }
    });

    await prisma.chat.update({
      where:{
        id:req.params.id,
      },
      data:{
        seenBy:{
          push:[tokenUserId]
        }
      }
    })
    return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where:{
        id:req.params.id,
       userIDs:{
        hasSome:[tokenUserId],
       },
      },
      data:{
        seenBy:{
          set:[tokenUserId],
        }
      },
    });
    return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chats!" });
  }
};
export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data:{
        userIDs:[tokenUserId,req.body.recieverId],
      },
    })
    return res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chats!" });
  }
};
