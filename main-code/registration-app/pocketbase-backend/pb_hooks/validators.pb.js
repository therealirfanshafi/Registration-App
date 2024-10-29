/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
    const grp = $app.dao().findRecordById('Group', e.record.get('Group'))
    for (let member of grp.get('Members')) {
        if ($app.dao().findRecordsByFilter('Group_Segment_Group', `Segment = "${e.record.get('Segment')}" && Group.Members.id ?= "${member}"`, '', 0, 0).length != 0) {
            throw new Error('failed')
        }
    }



}, 'Group_Segment_Group')

onRecordBeforeUpdateRequest((e) => {
    const segmentsOfGrp = $app.dao().findRecordsByFilter('Group_Segment_Group', `Group = "${e.record.id}"`, '', 0, 0).map((val) => val.get('Segment'))
    const currentMembers = $app.dao().findRecordById('Group', e.record.id).get('Members')
    const newMember = e.record.get('Members').find((val) => !currentMembers.includes(val))
    const segmentsOfMember = $app.dao().findRecordsByFilter('Group_Segment_Group', `Group.Members.id ?= "${newMember}"`, '', 0, 0).map((val) => val.get('Segment'))
    for (let seg1 of segmentsOfGrp) {
        for (let seg2 of segmentsOfMember) {
            if (seg1 == seg2) {
                throw new Error('failed')
            }
        }
    }

}, 'Group')


onRecordBeforeCreateRequest((e) => {
    $app.dao().expandRecord(e.record, ['Group', 'Participant'])
    const grp = e.record.expandedOne('Group')
    $app.dao().expandRecord(grp, ['Admin'])
    $app.dao().expandRecord(grp.expandedOne('Admin'), ['Category'])
    $app.dao().expandRecord(e.record.expandedOne('Participant'), ['Category'])
    if (grp.expandedOne('Admin').expandedOne('Category').get('Category') !== e.record.expandedOne('Participant').expandedOne('Category').get('Category')) {
        throw new Error('Failed Validation')
    }
}, 'Group_Requests')