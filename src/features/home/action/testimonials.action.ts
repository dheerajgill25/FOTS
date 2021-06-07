import EventType from "@libs/redux/action";


export class TestimonialsAction extends EventType {
    static EVENT_NAME = '@Testimonials/TESTIMONIALS';
    static getTestimonials(data:any) {
        return TestimonialsAction.requestSuccess(data);
    }
}