import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import lifecycle from "react-pure-lifecycle"

import AssignmentPanel from "../shared/containers/AssignmentPanel"
import SubmissionArchivePanelList from "./containers/SubmissionArchivePanelList"
import NavFooter from "../shared/components/NavFooter"
import ArchiveProgressPanel from "./containers/ArchiveProgressPanel"

import { settingsResetState } from "../../modules/settings/actions/settings-reset-state"
import { progress } from "../../modules/submissions/selectors"

const methods = {
  componentDidMount (_props) {
  }
}

const forwardButton = (progress, quitApp) => {
  if (progress < 0 || progress === 100) {
    return (
      {
        label: "Download Another Assignment",
        route: "/populate",
        onClick: quitApp
      }
    )
  }
}

const mossButton = (progress, moss) => {
  if (progress < 0 || progress === 100) {
    return (
      {
        label: "Moss",
        onClick: moss
      }
    )
  }
}

const ArchivePage = ({
  quitApp,
  progress, 
  moss
}) => (
  <div>
    <AssignmentPanel/>
    <ArchiveProgressPanel progress={progress}/>
    <SubmissionArchivePanelList />
    <NavFooter
      left={{
        label: "Cancel",
        route: "/populate",
        onClick: quitApp,
        disabled: progress < 0 || progress === 100
      }}
      center = {mossButton(progress, moss)}
      right= {forwardButton(progress, quitApp)}
    />
  </div>
)

const mapStateToProps = (state) => ({
  progress: progress(state)
})

const mapDispatchToProps = (dispatch) => ({
  quitApp: () => {
    dispatch(settingsResetState())
  },
  moss: () => {
    moss_time()
  }
})

const { spawn } = require('child_process')

function moss_time() {
  pythonProcess = spawn('python',["moss.py-master/moss_usage.py", "all", ""]); //No arg1
  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

ArchivePage.propTypes = {
  quitApp: PropTypes.func.isRequired,
  progress: PropTypes.number
}

export default lifecycle(methods)(connect(mapStateToProps, mapDispatchToProps)(ArchivePage))
