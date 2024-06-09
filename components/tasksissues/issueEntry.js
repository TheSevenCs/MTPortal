tasksissuesApp.component("component-issue", {
  props: ["issue"],
  template:
    /*html*/
    `
    <div class="task">{{ issue.issueName }}</div>
    `,
  data() {
    return {
      displayModal: false,
      isEditing: false,

      editIssueName: "",
      editIssueDate: "",
      editIssueDesc: "",
      editIssueStatus: "",
    };
  },
  methods: {
    toggleModal() {
      this.displayModal = !this.displayModal;
      this.isEditing = false;
      this.resetEdits();
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
      this.resetEdits();
    },
    resetEdits() {
      this.editIssueName = this.issue.issueName;
      this.editIssueDate = this.issue.issueDate;
      this.editIssueDesc = this.issue.issueDesc;
      this.editIssueStatus = this.issue.issueStatus;
    },
  },
});
