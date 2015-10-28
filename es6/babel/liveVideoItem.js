define(function (require) {
    var PureRenderMixin = require("../mixins/pureRenderMixin");

    var ImageLazy = require("../imageLazy");
    var DotAlarm = require("../dotAlarm");

    var LiveVideoItem = React.createClass({
        mixins: [PureRenderMixin],
        getDefaultProps: function () {
            return {
                addOnData: null,
                onClick: null,
                picPos: Enum.PicPos.INDEX,
                reportKey: "",
                liveItem: null,
                indexNum: 0
            }
        },
        getInitialState: function () {
            var liveItem = this.props.liveItem;

            //序号
            liveItem.indexNum = this.props.indexNum;

            liveItem = com.logic.liveItemDeal(liveItem, Enum.PicPos.INDEX);

            return {
                liveItem: liveItem
            };
        },
        handleClick: function (e) {
            var href = e.currentTarget.href;
            var liveItem = this.state.liveItem;
            var tmpLink = document.createElement("a");

            tmpLink.href = href;

            if (tmpLink.host !== location.host) {

                var liveId = liveItem.lLiveId || 0;
                var sourceType = com.logic.getSourceTypeByUrl(href);

                if (sourceType) {
                    sourceType = sourceType.srcId;
                } else {
                    sourceType = 0;
                }

                $fn.report("PLAY", [liveId, Enum.VideoType.LIVE, sourceType, 1, Enum.ActSrc.INDEX].join("_"));

                $fn.reportPlayNgx({
                    videoId: liveId,
                    videoType: Enum.VideoType.LIVE,
                    iSrc: sourceType,
                    setNum: 1,
                    actSrc: Enum.ActSrc.INDEX
                });

                //需要对站外URL进行下划线转意
                var reportRef = $fn.format("CARD_{0}_{1}_{2}", encodeURIComponent(href).replace(/_/ig, "%5f"), this.props.cardId, this.props.indexNum);

                $fn.report("VALIDPLAYPATH", reportRef);
            }

            this.props.onClick && this.props.onClick(e);
        },
        render: function () {
            var liveItem = this.state.liveItem;

            var totalPlayCount = null;

            //播放量
            if (liveItem.onLinePeople > 0 && CONF.TOGA.liveWithOnlinePeople === true) {
                totalPlayCount = <p className="subname">在线人数：{totalPlayCount}</p>;
            }

            //附加信息
            var addOnData = this.props.addOnData;
            if (addOnData) {
                addOnData = encodeURIComponent(JSON.stringify(addOnData));
            }

            return (
                <li className="mod-card-img">
                    <DotAlarm top={-5} right={0} />
                    <a onClick={this.handleClick} data-addon={addOnData} href={liveItem.detailUrl} data-ui-smartclick={true} className="img">
                        <ImageLazy src={liveItem.sPicUrl} />
                        <span className="count">{liveItem.sProgramTitle}</span>
                    </a>
                    <div className="info">
                        <p className="name">{liveItem.sLiveName}</p>
                        {totalPlayCount}
                    </div>
                </li>
            );
        }
    });

    return LiveVideoItem;
});