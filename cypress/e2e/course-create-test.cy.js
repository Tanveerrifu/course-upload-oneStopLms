import LoginPage from "../pages/Login";
import { generateRandomString } from "../helpers/cypress-utils";

import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

describe("Create new course", () => {
  const loginPage = new LoginPage();
  const randomCourseTitle = generateRandomString(5);
  const previewVideo = "selenium.mp4";
  const courseVideo = "coursevideo.mp4";
  const coverImage = "cover.jpg";
  const thumbnailImage = "thumbnail.jpg";
  const uploadFile = "file.zip";
  const tryMkv = "Footage.mkv";

  before(() => {
    loginPage.userlogin("marufrahman897@gmail.com", "Samtest1");
    cy.wait(15000);
  });
  it("User can go to course creation page by clicking add course", () => {
    cy.contains("Add Course").click();
    cy.wait(5000);
  });
  it("Course name should be 15 to 60 character", () => {
    cy.wait(2000);
    cy.get(":nth-child(1) > .form-control").clear().type(randomCourseTitle);
  });
  it("User can enter course title", () => {
    cy.wait(2000);
    cy.get(":nth-child(1) > .form-control")
      .clear()
      .type(randomCourseTitle + " Test Course for automation");
  });

  //To verify that course slug will be created automatically
  it("Course slug should be created automatically", () => {
    cy.get("form > :nth-child(3)").should(
      "include.text",
      "test-course-for-automation"
    );
  });

  //To verify that user can select instructor name by searching
  it("User can select instructor name by searching", () => {
    cy.get(
      ":nth-child(4) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3"
    ).type("Tanvir{enter}");
    cy.wait(5000);
    cy.get("#react-select-2-option-0").click();
  });
  //To verify that user can see course category by clicking on "Categories" field
  it("User can see course category by clicking on Categories field", () => {
    cy.get(
      ":nth-child(5) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3"
    ).click();
    cy.wait(2000);
    cy.get("#react-select-3-option-0").click();
    cy.get(".c-main").click();
  });

  it("Create new course button is working after giving all valid information", () => {
    cy.get(".form-submit").click();
    cy.wait(2000);
    cy.get(".modal-body > .action-block > .form-submit").click();
    cy.wait(5000);
    cy.get(".Toastify__toast-body").should(
      "include.text",
      "Course created successfully"
    );
  });

  //To verify that user can upload preview video
  it("User can upload preview video", () => {
    cy.wait(10000);
    cy.get("a > .border").click({ force: true });

    // Attach the file using the file input element
    cy.fixture("courseVideo.mp4", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get(".form-control-plaintext").attachFile({
          fileContent,
          fileName: "coursevideo.mp4",
          mimeType: "video/mp4",
          encoding: "utf8",
        });
      });
    cy.get(
      ":nth-child(3) > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();
    cy.wait(95000);
  });

  //To verify that user can upload course image
  it("User can upload course image", () => {
    cy.wait(30000);
    cy.contains("Add Images").click({ force: true });
    cy.get(":nth-child(1) > .d-flex > .d-block > input").attachFile(coverImage);
    cy.get(":nth-child(2) > .d-flex > .d-block > input").attachFile(
      thumbnailImage
    );
    cy.wait(10000);
    cy.xpath("//button[normalize-space()='Upload']").click({ force: true });
    cy.wait(15000);
    // cy.xpath("//button[normalize-space()='Upload']").click();
    // cy.wait(70000);
  });

  //To verify that a user can successfully edit the title of a course
  it("User can edit the title of the course", () => {
    cy.wait(25000);
    cy.get(
      ".card-body > :nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > .form-control"
    )
      .clear()
      .type("Edited Test Course for automation");
  });

  //To verify that user should be able to add course tags
  it("User can add course tags", () => {
    cy.wait(8000);
    cy.get(
      ":nth-child(2) > .css-2b097c-container > .css-yk16xz-control > .css-1hwfws3"
    ).click({ force: true });
    cy.get("#react-select-5-option-0").click();
    cy.get(".card-body").click({ force: true });
  });
  //To verify that a user can successfully select a course level from a dropdown menu
  it("User can select course level from a dropdown menu", () => {
    // Select an option by its value
    cy.get('select[name="skill_level"]').select("intermediate");
  });
  it("User can input course price", () => {
    cy.wait(10000);
    cy.get('input[name="price"]').clear().type("1000");
  });
  //To verify that discount allow checkbox is working
  it("User can check discount allow checkbox", () => {
    cy.wait(8000);
    cy.get("#flexCheckIndeterminate").click();
  });
  it("User can input discounted course price", () => {
    cy.wait(8000);
    cy.get('input[name="discounted_price"]').clear().type("200");
  });

  it("User can input course summary", () => {
    cy.get(".col-12 > .form-control").type(lorem.generateSentences(2));
  });
  it("User can input course description", () => {
    cy.get(
      ":nth-child(3) > .col-12 > .editor_textarea_block > .ck-editor > .ck-editor__main > .ck-blurred"
    ).type(lorem.generateSentences(5));
  });

  it("User can input course requirements", () => {
    cy.get(
      ":nth-child(4) > .col-12 > .editor_textarea_block > .ck-editor > .ck-editor__main > .ck-blurred"
    ).type(lorem.generateSentences(3));
  });

  it("User can input course outcomes", () => {
    cy.get(
      ":nth-child(5) > .col-12 > .editor_textarea_block > .ck-editor > .ck-editor__main > .ck-blurred"
    ).type(lorem.generateSentences(3));
  });

  it("User can input course includes", () => {
    cy.get(
      ":nth-child(6) > .col-12 > .editor_textarea_block > .ck-editor > .ck-editor__main > .ck-blurred"
    ).type(lorem.generateSentences(3));
  });

  it("User can input course Prerequisite", () => {
    cy.get(
      ":nth-child(7) > .col-12 > .editor_textarea_block > .ck-editor > .ck-editor__main > .ck-blurred"
    ).type(lorem.generateSentences(3));
  });

  it("User can input course notes", () => {
    cy.get(
      ":nth-child(8) > .col-12 > .editor_textarea_block > .ck-editor > .ck-editor__main > .ck-blurred"
    ).type(lorem.generateSentences(2));
  });

  it("User can save course upload content", () => {
    cy.wait(10000);
    cy.contains("Save").click();
    cy.wait(8000);
  });

  it("User can add course Q&A", () => {
    cy.get(":nth-child(2) > .ml-3 > .nav-link").click();
    cy.wait(10000);
    cy.get('input[name="question"]').type("What is your question?");
    cy.get('textarea[name="answer"]').type("This is my answer");
    cy.contains("Save").click();
  });

  it("User can add course curriculum", () => {
    cy.wait(8000);
    cy.contains("+ Create New chapter").click();
    cy.wait(5000);
    cy.get("#chapter_name").type("Chapter One");
    cy.get(
      ":nth-child(3) > .modal > .modal-dialog > .modal-content > .modal-body > form > .float-right > .btn-primary"
    ).click();
  });
  it.skip("User can add course video and content", () => {
    cy.get("#lesson_name").type("Lesson One");
    cy.get("#flexCheckIndeterminate").click();
    cy.wait(5000);
    cy.get("#video").attachFile(courseVideo);
    cy.get("#file").attachFile(uploadFile);
    cy.wait(5000);
    cy.get(".ml-4 > .float-right > .btn-primary").click(); //continue button
    cy.wait(5000);
    cy.get(
      ":nth-child(6) > .modal > .modal-dialog > .modal-content > .modal-body > form > #__input"
    ).type("Confirm");
    cy.wait(10000);
    cy.get(
      ":nth-child(6) > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click();
    cy.wait(30000);
    cy.get(".fa-undo").click();
    // cy.get(".ml-4 > .float-right > .btn-primary").click();
    // cy.wait(15000);
  });

  it(" User Can upload course content", () => {
    cy.get("#lesson_name").type("Lesson One");
    // cy.get("#file").attachFile(uploadFile);
    cy.fixture("courseVideo.mp4", "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("#video").attachFile({
          fileContent,
          fileName: "coursevideo.mp4",
          mimeType: "video/mp4",
          encoding: "utf8",
        });
        cy.wait(5000);
        cy.get(".ml-4 > .float-right > .btn-primary").click();
        cy.wait(5000);
        cy.get(
          ":nth-child(6) > .modal > .modal-dialog > .modal-content > .modal-body > form > #__input"
        ).type("Confirm");
        cy.get(
          ":nth-child(6) > .modal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
        ).click();
        cy.wait(18000);
      });
  });

  it("User can add course quiz", () => {
    cy.wait(10000);
    cy.get(":nth-child(2) > .action-block > .form-submit").click();
    cy.get(".single-question-section > :nth-child(1)").click();
    cy.wait(5000);
    cy.xpath("//input[@id='Question 10']").type(
      "Which is the capital of Bangladesh?"
    );
    cy.wait(5000);
    cy.get(
      ":nth-child(2) > .row > :nth-child(2) > .input-block-group > .input-container > #option_1"
    ).type("Khulna");
    cy.get(
      ":nth-child(2) > .row > :nth-child(3) > .input-block-group > .input-container > #option_1"
    ).type("Dhaka");
    cy.get(
      ":nth-child(2) > .row > :nth-child(4) > .input-block-group > .input-container > #option_1"
    ).type("Sylhet");
    cy.get(
      ":nth-child(2) > .row > :nth-child(5) > .input-block-group > .input-container > #option_1"
    ).type("Barisal");
    cy.wait(5000);
    cy.get(
      ":nth-child(2) > .row > :nth-child(3) > .input-checkbox-block > .custom-checkbox-control-label"
    ).click();

    //Question 2

    cy.xpath("//input[@id='Question 11']").type(
      "Which is the capital of Bangladesh?"
    );
    cy.wait(5000);
    cy.get(
      ":nth-child(3) > .row > :nth-child(2) > .input-block-group > .input-container > #option_1"
    ).type("Khulna");
    cy.get(
      ":nth-child(3) > .row > :nth-child(3) > .input-block-group > .input-container > #option_1"
    ).type("Dhaka");
    cy.get(
      ":nth-child(3) > .row > :nth-child(4) > .input-block-group > .input-container > #option_1"
    ).type("Sylhet");
    cy.get(
      ":nth-child(3) > .row > :nth-child(5) > .input-block-group > .input-container > #option_1"
    ).type("Barisal");
    cy.wait(5000);
    cy.get(
      ":nth-child(3) > .row > :nth-child(3) > .input-checkbox-block > .custom-checkbox-control-label"
    ).click();

    //Question 3

    cy.xpath("//input[@id='Question 12']").type(
      "Which is the capital of Bangladesh?"
    );
    cy.wait(5000);
    cy.get(
      ":nth-child(4) > .row > :nth-child(2) > .input-block-group > .input-container > #option_1"
    ).type("Khulna");
    cy.get(
      ":nth-child(4) > .row > :nth-child(3) > .input-block-group > .input-container > #option_1"
    ).type("Dhaka");
    cy.get(
      ":nth-child(4) > .row > :nth-child(4) > .input-block-group > .input-container > #option_1"
    ).type("Sylhet");
    cy.get(
      ":nth-child(4) > .row > :nth-child(5) > .input-block-group > .input-container > #option_1"
    ).type("Barisal");
    cy.wait(5000);
    cy.get(
      ":nth-child(4) > .row > :nth-child(2) > .input-checkbox-block > .custom-checkbox-control-label"
    ).click();

    //save
    cy.wait(5000);
    cy.get(".single-question-section > .action-block > .form-submit").click();
    cy.wait(10000);
  });

  it("Publish Course", () => {
    cy.wait(15000);
    cy.contains("Overview").click();
    cy.wait(8000);
    cy.contains("Publish").click({force:true});
    cy.wait(20000);
    // cy.xpath("//div[@role='alert']").should(
    //   "include.text",
    //   "Course published successfully"
    // );
  });
  after(() => {
    cy.clearLocalStorage();
    //cy.logout();
    //cy.clearLocalStorage();
    // cy.removeLocalStorage("myData");
  });
});
