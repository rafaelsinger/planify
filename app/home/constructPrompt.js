import { learningApproaches } from "./dropdowns";

export const constructPrompt = (fields) => {
    console.log(fields);

    // required
    const state = fields.state
    const subject = fields.subject
    const grade = fields.grade
    const learningApproach = fields.learningApproach
    const learningStyle = fields.learningStyle
    const topic = fields.topic
    const totalTime = fields.totalTopicTime
    const classTime = fields.classTime
    const numberOfClasses = fields.numberOfClasses

    // optional
    const curriculum = fields.curriculum ?? null;
    const district = fields.district ?? null;

    if ((curriculum == null) && (district == null)) {
        const prompt = `Design a lesson plan aligned with the ${state} curriculum for a ${subject} class. Currently, we are focusing on ${topic}. The target audience consists of ${grade} graders, and each class session is scheduled for ${classTime}. The topic is designed to extend over ${totalTime} and will be delivered in a total of ${numberOfClasses} classes. The lesson plan will be for each class. The desired learning approach is ${learningApproach} and learning style is ${learningStyle}`;
    }
    else if ((curriculum == null) && (district != null)) {
        const prompt = `Design a lesson plan aligned with the ${state} and ${district} curriculum for a ${subject} class. Currently, we are focusing on ${topic}. The target audience consists of ${grade} graders, and each class session is scheduled for ${classTime}. The topic is designed to extend over ${totalTime} and will be delivered in a total of ${numberOfClasses} classes. The lesson plan will be for each class. The desired learning approach is ${learningApproach} and learning style is ${learningStyle}`;
    }
    else if ((curriculum != null) && (district == null)) {
        const prompt = `Design a lesson plan aligned with the ${state} curriculum for a ${subject} class in the ${curriculum} program. Currently, we are focusing on ${topic}. The target audience consists of ${grade} graders, and each class session is scheduled for ${classTime}. The topic is designed to extend over ${totalTime} and will be delivered in a total of ${numberOfClasses} classes. The lesson plan will be for each class. The desired learning approach is ${learningApproach} and learning style is ${learningStyle}`;
    }
    else {
        const prompt = `Design a lesson plan aligned with the ${state} and ${district} curriculum for a ${subject} class in the ${curriculum} program. Currently, we are focusing on ${topic}. The target audience consists of ${grade} graders, and each class session is scheduled for ${classTime}. The topic is designed to extend over ${totalTime} and will be delivered in a total of ${numberOfClasses} classes. The lesson plan will be for each class. The desired learning approach is ${learningApproach} and learning style is ${learningStyle}`;
    }
};
