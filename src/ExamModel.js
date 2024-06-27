class Exam {
   constructor(id, title, questions, studentsTaken) {
        this.id = id
        this.title = title
        this.questions = questions
        this.studentsTaken = studentsTaken

   }
}

class Question {
    constructor(id, question, options, correctOption) {
        this.id = id
        this.question = question
        this.options = options
        this.correctOption = correctOption
    }
}

const QuestionConverter = {
    
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Question(data.id, data.question, data.options, data.correctOption);
    }
};